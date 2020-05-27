import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Alert, Modal, ModalBody, ModalHeader } from "reactstrap";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";
import { countCartHandler } from "../../../redux/actions";

import { priceFormatter } from "../../../supports/helpers/formatter";

class Cart extends React.Component {
  state = {
    dateCalendar: new Date(),
    cartData: [],
    modalOpen: false,
    // nyimpan id transac
    id: 0,
    checkoutData: {
      userId: 0,
      grandTotalPrice: 0,
      status: "pending",
      transactionDate: "",
      completionDate: ""
    },
    delivery: 0,
    deliveryCost: 0,
    shipping: "instant"
  };

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
    this.deliveryCostHandler();
  };

  componentDidMount() {
    this.getCartData();
    this.deliveryCostHandler();
    this.props.numberOfItemInCart(this.props.user.id);
  }

  getCartData = () => {
    let grandTotalPrice = 0;

    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product"
      }
    })
      .then(res => {
        console.log(res.data);
        res.data.map(val => {
          grandTotalPrice += val.quantity * val.product.price;
        });

        this.setState({
          cartData: res.data,
          checkoutData: {
            ...this.state.checkoutData,
            userId: this.props.user.id,
            grandTotalPrice: grandTotalPrice + +this.state.delivery,
            transactionDate: this.state.dateCalendar.toLocaleDateString()
            // items: res.data
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderCart = () => {
    return this.state.cartData.map((val, idx) => {
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>
            <img
              src={val.product.image}
              style={{ width: "100%", objectFit: "contain", height: "100px" }}
            />
          </td>
          <td>{val.product.productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR"
            }).format(val.product.price)}
          </td>
          <td>{val.quantity}</td>
          <td>
            <ButtonUI
              type="outlined"
              onClick={() => this.deleteHandler(val.id)}
            >
              Delete Item
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  deleteHandler = id => {
    Axios.delete(`${API_URL}/carts/${id}`)
      .then(res => {
        console.log(res);
        this.getCartData();

        this.props.numberOfItemInCart(this.props.user.id);
      })
      .catch(err => {
        console.log("gagal");
      });
  };

  deliveryCostHandler = () => {
    if (this.state.delivery == "instant") {
      this.setState({ deliveryCost: 100000 });
    } else if (this.state.delivery == "sameday") {
      this.setState({ deliveryCost: 50000 });
    } else if (this.state.delivery == "express") {
      this.setState({ deliveryCost: 20000 });
    } else if (this.state.delivery == "economy") {
      this.setState({ deliveryCost: 0 });
    }
  };

  checkoutBtnHandler = () => {
    this.setState({
      modalOpen: true
    });
  };

  checkoutHandlder = () => {
    console.log(this.state.deliveryCost);
    console.log(this.state.delivery);
    const { cartData } = this.state;
    let totalPrice;
    return cartData.map((val, idx) => {
      const { quantity, product } = val;
      totalPrice = quantity * product.price;
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td>{product.productName}</td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
              }).format(product.price)}
            </td>
            <td>{quantity}</td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
              }).format(totalPrice)}
            </td>
          </tr>
        </>
      );
    });
  };
  confirmPayment = () => {
    Axios.post(`${API_URL}/transactions`, {
      ...this.state.checkoutData,
      grandTotalPrice: this.renderTotalPrice()
    })
      .then(res => {
        this.state.cartData.map(val => {
          Axios.post(`${API_URL}/transactionDetails`, {
            transactionId: res.data.id,
            productId: val.productId,
            price: val.product.price,
            quantity: val.quantity,
            totalPrice: val.product.price * val.quantity
          })
            .then(res => {
              console.log(res);
              swal("Thank you!", "Your Transaction is Success", "success");
              this.setState({ modalOpen: false });
              // empty cart
              this.state.cartData.map(val => {
                return this.deleteHandler(val.id);
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
        console.log(res);
        swal("Success", "your transaction is success", "success");
      })
      .catch(err => {
        console.log(err);
      });
  };
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  checkboxHandler = (e, idx) => {
    const { checked } = e.target;
    if (checked) {
      this.setState({
        items: [...this.state.cartData, idx]
      });
    } else {
      this.setState({
        items: [...this.state.cartData.filter(val => val !== idx)]
      });
    }
  };

  renderSubTotalPrice = () => {
    let totalPrice = 0;

    this.state.cartData.forEach(val => {
      const { quantity, product } = val;
      const { price } = product;

      totalPrice += quantity * price;
    });

    return totalPrice;
  };

  renderShippingPrice = () => {
    switch (this.state.shipping) {
      case "instant":
        return priceFormatter(100000);
      case "sameDay":
        return priceFormatter(50000);
      case "express":
        return priceFormatter(20000);
      default:
        return "Free";
    }
  };

  renderTotalPrice = () => {
    let totalPrice = 0;

    this.state.cartData.forEach(val => {
      const { quantity, product } = val;
      const { price } = product;

      totalPrice += quantity * price;
    });

    let shippingPrice = 0;

    switch (this.state.shipping) {
      case "instant":
        shippingPrice = 100000;
        break;
      case "sameDay":
        shippingPrice = 50000;
        break;
      case "express":
        shippingPrice = 20000;
        break;
      default:
        shippingPrice = 0;
        break;
    }

    return totalPrice + shippingPrice;
  };

  render() {
    return (
      <div className="container py-4">
        <caption className="p-3">
          <h2>Cart</h2>
        </caption>
        {this.state.cartData.length > 0 ? (
          <div className="container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCart()}</tbody>
            </table>
            <div className="cart-card">
              <div className="cart-card-head p-4">Order Summary</div>
              <div className="cart-card-body p-4">
                <div className="d-flex justify-content-between my-2">
                  <div>Subtotal</div>
                  <strong>{priceFormatter(this.renderSubTotalPrice())}</strong>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <div>Shipping</div>
                  <strong>{this.renderShippingPrice()}</strong>
                </div>
                <div className="d-flex justify-content-between my-2 align-items-center">
                  <label>Shipping Method</label>
                  <select
                    onChange={e => this.setState({ shipping: e.target.value })}
                    className="form-control w-50"
                  >
                    <option value="instant">Instant</option>
                    <option value="sameDay">Same Day</option>
                    <option value="express">Express</option>
                    <option value="economy">Economy</option>
                  </select>
                </div>
                <div className="cart-card-foot p-4">
                  <div className="d-flex justify-content-between my-2">
                    <div>Total</div>
                    <div>{priceFormatter(this.renderTotalPrice())}</div>
                  </div>
                </div>
                <input
                  onClick={this.checkoutBtnHandler}
                  type="button"
                  value="Checkout"
                  className="btn btn-success btn-block mt-3"
                />
              </div>
            </div>
          </div>
        ) : (
          <Alert>
            Your cart is empty! <Link to="/">Go shopping</Link>
          </Alert>
        )}
        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          size="lg"
          centered
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Checkout</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row d-flex justify-content-center">
              <div className="col-12 align-items-center">
                <h5 className="mt-3">Customer : {this.props.user.fullName}</h5>
                <Table centered className="mt-3">
                  <thead>
                    <th>No.</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </thead>
                  <tbody>
                    {this.checkoutHandlder()}

                    <tr colSpan={2}>
                      Delivery Cost : {this.renderShippingPrice()}
                    </tr>
                    <tr colSpan={3}>
                      grand Total Price :
                      {priceFormatter(this.renderTotalPrice())}
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="col-3 mt-3 offset-1">
                <ButtonUI
                  className="w-100"
                  onClick={this.toggleModal}
                  type="outlined"
                >
                  Cancel
                </ButtonUI>
              </div>
              <div className="col-3 mt-3">
                <ButtonUI
                  className="w-100"
                  onClick={this.confirmPayment}
                  type="contained"
                >
                  Cofirm
                </ButtonUI>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  };
};
const mapDispatchToProps = {
  numberOfItemInCart: countCartHandler
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
