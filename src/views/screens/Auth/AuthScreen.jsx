import React from "react";
import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import "./AuthScreen.css";

class AuthScreen extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <div className="d-flex justify-content-start">
              <ButtonUI type="light-pill-unselected" className="mt-4">
                Register
              </ButtonUI>
              <ButtonUI type="light-pill-selected" className="mt-4 ml-2">
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
              <TextField placeholder="Username" className="mt-5" />
              <TextField placeholder="Password" className="mt-2" />
              {/* <p className="rect"></p> */}
              <p className="mt-2">Remember me</p>
              <div className="d-flex justify-content-center">
                <ButtonUI type="contained" className="mt-4">
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
    );
  }
}

export default AuthScreen;
