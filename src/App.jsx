import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/Auth/AuthScreen";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import Cart from "./views/screens/Cart/Cart";
// import AdminDashboard from "./views/screens/Admin/AdminDashboard";
import { userKeepLogin, cookieChecker } from "./redux/actions";
// import Payments from "./views/screens/Admin/Payments";
import PageNotFound from "./views/screens/PageNotFound";
import History from "./views/screens/History/History";
// import Report from "./views/screens/Admin/Report";
import Wishlist from "./views/screens/Wishlist/Wishlist";
import AdminDashboard from "./views/screens/Admin/AdminDashboard";
import AdminPayment from "./views/screens/AdminPayment/AdminPayment";
import AdminReport from "./views/screens/AdminReport/AdminReport";
import AdminMembers from "./views/screens/AdminMembers/AdminMembers";

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    let cookieResult = cookieObj.get("authData", { path: "/" });
    if (cookieResult) {
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
  }

  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return (
        <>
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/payment" component={AdminPayment} />
          <Route exact path="/admin/members" component={AdminMembers} />
          <Route exact path="/admin/report" component={AdminReport} />
        </>
      );
    }
  };
  renderProtectedRoutes = () => {
    if (this.props.user.id) {
      return (
        <>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/history" component={History} />
          <Route exact path="/wishlist" component={Wishlist} />
        </>
      );
    }
  };
  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={AuthScreen} />
            <Route
              exact
              path="/product/:productId"
              component={ProductDetails}
            />
            {this.renderAdminRoutes()}
            {this.renderProtectedRoutes()}
            <Route path="*" component={PageNotFound} />
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

/**
 * PR
 * 1. Add to cart, jika barang double, qty yg akan bertambah
 * 2. Di Home, ketika click PHONE/LAPTOP/TAB/DESKTOP
 * 3. Di navbar, ketika ketik, secara otomatis filter products
 * 4. Di cart, buat button checkout, serta dengan proses checkout
 * 5. Ketika confirm checkout, lakukan POST request ke db.json ke transaction
 *    -> lalu cart harus kosong
 *
 * TRANSACTIONS
 * userId
 * total price
 * status -> "pending"
 * tanggal belanja
 * tanggal selesai -> ""
 *
 * TRANSACTION_DETAILS
 * transactionId
 * productId
 * price
 * quantity
 * totalPrice (price * quantity)
 *
 */
