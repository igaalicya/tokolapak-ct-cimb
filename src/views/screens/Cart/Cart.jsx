import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

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
            <input
              type="button"
              className="btn btn-danger"
              value="Delete"
              onClick={() => this.deleteHandler(val.id)}
            />
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

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 text-center">Cart List</h2>
        <table className="table text-center mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th colSpan="2">Nama Product</th>
              <th>Harga</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          {this.state.cartData.length != 0 ? (
            <tbody>{this.renderCart()}</tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="6">Cart Kosong! silahkan belanja</td>
              </tr>
            </tbody>
          )}
        </table>
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
