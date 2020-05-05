import React from "react";
import { connect } from "react-redux";
import { Table, Alert } from "reactstrap";
import "./Wishlist.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";
import { countCartHandler } from "../../../redux/actions";

class Wishlist extends React.Component {
  state = {
    wishlistsData: []
  };

  componentDidMount() {
    this.getWishlistData();
    this.props.numberOfItemInCart(this.props.user.id);
  }

  getWishlistData = () => {
    Axios.get(`${API_URL}/wishlists`, {
      params: {
        userId: this.props.user.id,
        _expand: "product"
      }
    })
      .then(res => {
        console.log(res.data);

        this.setState({
          wishlistsData: res.data
        });

        console.log(this.state.wishlistData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderWishlist = () => {
    return this.state.wishlistsData.map((val, idx) => {
      const { product } = val;
      const { id, image, price, productName } = product;
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>
            <img
              src={image}
              style={{ width: "100%", objectFit: "contain", height: "100px" }}
            />
          </td>
          <td>{productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR"
            }).format(price)}
          </td>
          <td className="text-right">
            <ButtonUI type="outlined" onClick={() => this.addToCartHandler(id)}>
              Add To Cart
            </ButtonUI>
          </td>
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
    console.log(id);
    Axios.delete(`${API_URL}/wishlists/${id}`)
      .then(res => {
        console.log(res);
        this.getWishlistData();
        swal(
          "Success",
          "Your item has been deleted from your wishlist",
          "success"
        );
      })
      .catch(err => {
        console.log(err);
        swal("Error", "Your item failed to delete from your wishlist", "error");
      });
  };

  addToCartHandler = id => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        productId: id,
        userId: this.props.user.id
      }
    }).then(res => {
      if (res.data.length > 0) {
        Axios.patch(`${API_URL}/carts/${res.data[0].id}`, {
          quantity: res.data[0].quantity + 1
        })
          .then(res => {
            swal(
              "Add to cart",
              "Your item has been added to your cart",
              "success"
            );
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Axios.post(`${API_URL}/carts`, {
          userId: this.props.user.id,
          productId: id,
          quantity: 1
        })
          .then(res => {
            console.log(res);
            swal(
              "Add to cart",
              "Your item has been added to your cart",
              "success"
            );
            this.props.numberOfItemInCart(this.props.user.id);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
    console.log(id);
  };

  render() {
    return (
      <div className="container py-4">
        <caption className="p-3">
          <h2>Wishlist</h2>
        </caption>
        {this.state.wishlistsData.length > 0 ? (
          <Table>
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">{this.renderWishlist()}</tbody>
            <tfoot></tfoot>
          </Table>
        ) : (
          <Alert>Your wishlist is empty!</Alert>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
