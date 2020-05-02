import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Alert, Modal, ModalBody, ModalHeader } from "reactstrap";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";

class Cart extends React.Component {
  state = {
    cartData: [],
    modalOpen: false,
    checkoutData: {
      userId: 0,
      totalPrice: 0,
      status: "pending",
      items: []
    }
  };

  componentDidMount() {
    this.getCartData();
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
            totalPrice: grandTotalPrice,
            items: res.data
          }
        });

        console.log(this.state.checkoutData.items);
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
      })
      .catch(err => {
        console.log("gagal");
      });
  };

  checkoutBtnHandler = () => {
    this.setState({
      modalOpen: true
    });
  };

  checkoutHandlder = () => {
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
    Axios.post(`${API_URL}/transaction`, this.state.checkoutData)
      .then(res => {
        console.log(res.data);
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
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    return (
      <div className="container py-4">
        {this.state.cartData.length > 0 ? (
          <Table>
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">{this.renderCart()}</tbody>
            <tfoot>
              <tr>
                <td colSpan={5}></td>
                <td colSpan={1}>
                  <ButtonUI onClick={this.checkoutBtnHandler} type="contained">
                    CheckOut
                  </ButtonUI>
                </td>
              </tr>
            </tfoot>
          </Table>
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
                    <tr colSpan={5}>
                      Subtotal :{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR"
                      }).format(this.state.checkoutData.totalPrice)}
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
    user: state.user
  };
};

export default connect(mapStateToProps)(Cart);
