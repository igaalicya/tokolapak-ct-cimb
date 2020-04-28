import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import "./AuthScreen.css";
<<<<<<< HEAD
import { registerHandler, loginHandler } from "../../../redux/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import Cookie from "universal-cookie";

const cookieObject = new Cookie();

class AuthScreen extends React.Component {
  state = {
    username: "",
    fullName: "",
    password: "",
    repPassword: "",
    loginUsername: "",
    loginPass: "",
    userLogin: "",
    isCondition: true,
    users: []
  };

  isLogin = () => {
    this.setState({ isCondition: true });
  };

  isRegister = () => {
    this.setState({ isCondition: false });
  };

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  registerHandler = () => {
    const { repPassword, password, username, fullName } = this.state;

    const userData = {
      username,
      password,
      repPassword,
      fullName,
      role: "user"
    };

    if (password == repPassword) {
      this.props.registerHandler(userData);
      
    } else {
      
    }
  };

  loginHandler = () => {
    const { loginUsername, loginPass } = this.state;

    const userData = {
      username: loginUsername,
      password: loginPass
    };

    this.props.loginHandler(userData);
    
  };

  render() {
    const {
      username,
      fullName,
      password,
      repPassword,
      loginUsername,
      loginPass,
      isCondition
    } = this.state;
    return isCondition ? (
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <div className="d-flex justify-content-start">
              <ButtonUI
                type="light-pill-unselected"
                className="mt-4"
                onClick={this.isRegister}
=======

// actions
import { registerHandler, loginHandler } from "../../../redux/actions";

class AuthScreen extends React.Component {
  state = {
    activePage: "register",
    loginForm: {
      username: "",
      password: "",
      showPassword: false,
    },
    registerForm: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      showPassword: false,
    },
  };

  componentDidUpdate() {
    if (this.props.user.id) {
      const cookie = new Cookies();
      cookie.set("authData", JSON.stringify(this.props.user));
    }
  }

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });

    // this.setState({ loginForm: {
    //   ...this.state.loginForm,
    //   [fieldYangDiganti]: value
    // }})
  };

  registerBtnHandler = () => {
    const { username, fullName, password, email } = this.state.registerForm;
    let newUser = {
      username,
      fullName,
      password,
      email,
    };

    this.props.onRegister(newUser);
  };

  loginBtnHandler = () => {
    const { username, password } = this.state.loginForm;
    let newUser = {
      username,
      password,
    };

    this.props.onLogin(newUser);
  };

  renderAuthComponent = () => {
    const { activePage } = this.state;
    if (activePage == "register") {
      return (
        <div className="mt-5">
          <h3>Register</h3>
          <p className="mt-4">
            You will get the best recommendation for rent house in near of you
          </p>
          <TextField
            value={this.state.registerForm.username}
            onChange={(e) => this.inputHandler(e, "username", "registerForm")}
            placeholder="Username"
            className="mt-5"
          />
          <TextField
            value={this.state.registerForm.fullName}
            onChange={(e) => this.inputHandler(e, "fullName", "registerForm")}
            placeholder="Name"
            className="mt-2"
          />
          <TextField
            value={this.state.registerForm.email}
            onChange={(e) => this.inputHandler(e, "email", "registerForm")}
            placeholder="Email"
            className="mt-2"
          />
          <TextField
            value={this.state.registerForm.password}
            onChange={(e) => this.inputHandler(e, "password", "registerForm")}
            placeholder="Password"
            className="mt-2"
          />
          <div className="d-flex justify-content-center">
            <ButtonUI
              type="contained"
              onClick={this.registerBtnHandler}
              className="mt-4"
            >
              Register
            </ButtonUI>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-5">
          <h3>Log In</h3>
          <p className="mt-4">
            Welcome back.
            <br /> Please, login to your account
          </p>
          <TextField
            value={this.state.loginForm.username}
            onChange={(e) => this.inputHandler(e, "username", "loginForm")}
            placeholder="Username"
            className="mt-5"
          />
          <TextField
            value={this.state.loginForm.password}
            onChange={(e) => this.inputHandler(e, "password", "loginForm")}
            placeholder="Password"
            className="mt-2"
          />
          <div className="d-flex justify-content-center">
            <ButtonUI
              onClick={this.loginBtnHandler}
              type="contained"
              className="mt-4"
            >
              Login
            </ButtonUI>
          </div>
        </div>
      );
    }
  };

  render() {
    if (this.props.user.id > 0) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <div className="d-flex flex-row">
              <ButtonUI
                className={`auth-screen-btn ${
                  this.state.activePage == "register" ? "active" : null
                }`}
                type="outlined"
                onClick={() => this.setState({ activePage: "register" })}
>>>>>>> b3541bf0b53fdcd6b4cf9d0a81cc8863434e3324
              >
                Register
              </ButtonUI>
              <ButtonUI
<<<<<<< HEAD
                type="light-pill-selected"
                className="mt-4 ml-2"
                onClick={this.isLogin}
              >
                Login
              </ButtonUI>
            </div>
            <div>
              <h3 className="mt-4">Login</h3>
              <p className="mt-4 text-gray">
                Welcome back.
                <br />
                Please, login to your account
              </p>
              <TextField
                value={loginUsername}
                placeholder="Username"
                className="mt-5"
                onChange={e => this.inputHandler(e, "loginUsername")}
              />
              <TextField
                value={loginPass}
                placeholder="Password"
                className="mt-2"
                onChange={e => this.inputHandler(e, "loginPass")}
              />
              <div className="d-flex align-items-center mt-2">
                <input type="checkbox" name="" id="" value="ok" />
                <p className="ml-2">Remember me</p>
              </div>
              <div className="d-flex justify-content-center">
                <ButtonUI
                  type="contained"
                  className="mt-4"
                  onClick={this.loginHandler}
                >
                  Login
                </ButtonUI>
              </div>
              <div className="d-flex justify-content-center">
                <p className="text-accent-default mt-3">Forgot Password?</p>
              </div>
            </div>
          </div>
          <div className="col-7">Picture</div>
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <div className="d-flex">
              <ButtonUI
                type="light-pill-selected"
                className="mt-4"
                onClick={this.isRegister}
              >
                Register
              </ButtonUI>
              <ButtonUI
                type="light-pill-unselected"
                className="mt-4 ml-2"
                onClick={this.isLogin}
              >
                Login
              </ButtonUI>
            </div>
            <div>
              <h3 className="mt-4">Register</h3>
              <p className="mt-4 text-gray">
                You will get the best recommendation for rent <br />
                house in near of you
              </p>
              <TextField
                value={username}
                placeholder="Username"
                className="mt-5"
                onChange={e => this.inputHandler(e, "username")}
              />
              <TextField
                value={fullName}
                placeholder="Full Name"
                className="mt-2"
                onChange={e => this.inputHandler(e, "fullName")}
              />
              <TextField
                placeholder="Password"
                className="mt-2"
                onChange={e => this.inputHandler(e, "password")}
              />
              <TextField
                placeholder="Confirm Password"
                className="mt-2"
                onChange={e => this.inputHandler(e, "repPassword")}
              />
              <div className="d-flex align-items-center mt-2">
                <input type="checkbox" name="" id="" value="ok" />
                <p className="ml-2">
                  I agree to
                  <span className="text-accent-default">
                    {" "}
                    Terms of Use
                  </span>{" "}
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <ButtonUI
                  type="contained"
                  className="mt-4"
                  onClick={this.registerHandler}
                >
                  Register
                </ButtonUI>
              </div>
=======
                className={`ml-3 auth-screen-btn ${
                  this.state.activePage == "login" ? "active" : null
                }`}
                type="outlined"
                onClick={() => this.setState({ activePage: "login" })}
              >
                Login
              </ButtonUI>
>>>>>>> b3541bf0b53fdcd6b4cf9d0a81cc8863434e3324
            </div>
            {this.props.user.errMsg ? (
              <div className="alert alert-danger mt-3">
                {this.props.user.errMsg}
              </div>
            ) : null}
            {this.renderAuthComponent()}
          </div>
          <div className="col-7">Picture</div>
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
const stateMapToProps = state => {
  return {
    user: state.user
=======
const mapStateToProps = (state) => {
  return {
    user: state.user,
>>>>>>> b3541bf0b53fdcd6b4cf9d0a81cc8863434e3324
  };
};

const mapDispatchToProps = {
<<<<<<< HEAD
  loginHandler,
  registerHandler
};

export default connect(stateMapToProps, mapDispatchToProps)(AuthScreen);
=======
  onRegister: registerHandler,
  onLogin: loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
>>>>>>> b3541bf0b53fdcd6b4cf9d0a81cc8863434e3324
