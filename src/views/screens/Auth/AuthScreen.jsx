import React from "react";
import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import "./AuthScreen.css";
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
      swal("Berhasil", "Registrasi akun berhasil", "success");
    } else {
      swal("Gagal", "Password tidak cocok", "error");
    }
  };

  loginHandler = () => {
    const { loginUsername, loginPass } = this.state;

    const userData = {
      username: loginUsername,
      password: loginPass
    };

    this.props.loginHandler(userData);
    swal("Berhasil", `Selamat ${userData.username} berhasil masuk`, "success");
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
              >
                Register
              </ButtonUI>
              <ButtonUI
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
            </div>
          </div>
          <div className="col-7">Picture</div>
        </div>
      </div>
    );
  }
}

const stateMapToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  loginHandler,
  registerHandler
};

export default connect(stateMapToProps, mapDispatchToProps)(AuthScreen);
