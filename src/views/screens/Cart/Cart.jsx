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
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id,
        _expand: "product"
      }
    })
      .then(res => {
        console.log(res.data[0]);
        this.setState({ cartData: res.data[0] });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderCart = () => {
    return this.state.cartData.map(val => {
      return (
        <tr>
          <td>{val.id}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <table className="table-bordered" align="center">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Product</th>
              <th>Harga</th>
              <th>Quantity</th>
            </tr>
          </thead>
          {/* <tbody>{this.renderCart()}</tbody> */}
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
