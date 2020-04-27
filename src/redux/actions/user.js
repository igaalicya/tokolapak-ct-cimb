import Axios from "axios";
import { API_URL } from "../../constant/API";
import user from "../reducers/user";
import Cookie from "universal-cookie";
import userTypes from "../types/user";

const { ON_LOGIN_SUCCESS, ON_LOGIN_FAIL, ON_LOGOUT_SUCCESS } = userTypes;

const cookieObject = new Cookie();

export const usernameInputHandler = text => {
  return {
    type: "ON_CHANGE_USERNAME",
    payload: text
  };
};

export const loginHandler = userData => {
  return dispatch => {
    const { username, password } = userData;

    Axios.get(`${API_URL}/users`, {
      params: {
        username,
        password
      }
    })
      .then(res => {
        if (res.data.length > 0) {
          // alert("masuk");
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data[0]
            // {
            //   id,
            //   username,
            //   password,
            //   fullName,
            //   role,
            // }
          });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username atau password salah"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// export const registerHandler = userData => {
//   return dispatch => {
//     const {
//       username,
//       password,
//       repPassword,
//       role,
//       firstName,
//       lastName
//     } = userData;

//     Axios.get(`${API_URL}/users`, {
//       params: {
//         username
//       }
//     })
//       .then(res => {
//         if (res.data.length == 0) {
//           if (password == repPassword) {
//             Axios.post(`${API_URL}/users`, {
//               username: username,
//               password: password,
//               role: role,
//               fullName: firstName + " " + lastName
//             })
//               .then(res => {
//                 dispatch({
//                   type: "ON_REGISTER_SUCCESS",
//                   payload: res.data
//                 });
//               })
//               .catch(err => {
//                 dispatch({
//                   type: "ON_REGISTER_FAIL",
//                   payload: "Password tidak sesuai atau username telah digunakan"
//                 });
//               });
//           } else {
//             dispatch({
//               type: "ON_REGISTER_FAIL",
//               payload: "Password tidak sesuai atau username telah digunakan"
//             });
//           }
//         } else {
//           dispatch({
//             type: "ON_REGISTER_FAIL",
//             payload: "Password tidak sesuai atau username telah digunakan"
//           });
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// };

export const userKeepLogin = userData => {
  return dispatch => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id
      }
    })
      .then(res => {
        if (res.data.length > 0) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data[0]
          });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username atau password salah"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const logoutHandler = () => {
  // bisa ditaroh sini bisa ditaroh navbar
  cookieObject.remove("authData");
  return {
    type: "ON_LOGOUT"
  };
};

export const registerHandler = userData => {
  return dispatch => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username: userData.username
      }
    })
      .then(res => {
        if (res.data.length > 0) {
          dispatch({
            type: "ON_REGISTER_FAIL",
            payload: "username sudah digunakan"
          });
        } else {
          Axios.post(`${API_URL}/users`, userData)
            .then(res => {
              console.log(res.data);
              dispatch({
                type: ON_LOGIN_SUCCESS,
                payload: res.data
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};
