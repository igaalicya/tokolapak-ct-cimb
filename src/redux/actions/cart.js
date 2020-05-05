import Axios from "axios";
import { API_URL } from "../../constants/API";

export const countCartHandler = id => {
  return dispatch => {
    let totalItem = 0;
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: id
      }
    })
      .then(res => {
        res.data.map(val => {
          return (totalItem += val.quantity);
        });

        dispatch({
          type: "GET_NUMBER_OF_ITEM",
          payload: totalItem
        });
        // }
      })
      .catch(err => {
        console.log(err);
      });
  };
};
