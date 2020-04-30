import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Alert, Modal } from "reactstrap";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";

class Cart extends React.Component {
  state = {
    cartData: []
  };

  componentDidMount() {
    this.getCartData();
  }

  getCartData = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product"
      }
    })
      .then(res => {
        console.log(res.data);
        this.setState({ cartData: res.data });
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

  checkoutHandlder = () => {
    const { cartData } = this.state;
    return cartData.map((val, idx) => {
      const { quantity, product } = val;
      const totalPrice = quantity * product.price;
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{product.productName}</td>
          <td>{quantity}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR"
            }).format(product.price)}
          </td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR"
            }).format(totalPrice)}
          </td>
        </tr>
      );
    });
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
                  <Link to="/checkout">
                    <ButtonUI
                      // onClick={this.checkoutModal}
                      type="contained"
                    >
                      CheckOut
                    </ButtonUI>
                  </Link>
                </td>
              </tr>
            </tfoot>
          </Table>
        ) : (
          <Alert>
            Your cart is empty! <Link to="/">Go shopping</Link>
          </Alert>
        )}
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
