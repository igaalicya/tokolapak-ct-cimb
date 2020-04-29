import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

class Cart extends React.Component {
  componentDidMount() {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product"
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    // Axios.get(`${API_URL}/products/1`, {
    //   params: {
    //     _embed: "carts",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

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
