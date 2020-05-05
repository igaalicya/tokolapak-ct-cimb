import React from "react";
import { connect } from "react-redux";
import { Table, Alert } from "reactstrap";
import "./History.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";

class History extends React.Component {
  state = {
    historyData: []
  };

  componentDidMount() {
    this.getHistoryData();
  }

  getHistoryData = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        userId: this.props.user.id,
        status: "completed"
      }
    })
      .then(res => {
        console.log(res.data);

        this.setState({
          historyData: res.data
        });

        console.log(this.state.historyData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderHistory = () => {
    return this.state.historyData.map((val, idx) => {
      const {
        id,
        userId,
        totalPrice,
        status,
        transactionDate,
        CompletionDate
      } = val;
      return (
        <tr className="text-center">
          <td> {idx + 1} </td>
          <td> {userId} </td>
          <td> {transactionDate} </td>
          <td> {CompletionDate} </td>
          <td>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR"
            }).format(totalPrice)}{" "}
          </td>
          <td>{status}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container py-4">
        <caption className="p-3">
          <h2>History</h2>
        </caption>
        {this.state.historyData.length > 0 ? (
          <Table>
            <thead className="text-center">
              <tr className="text-center">
                <th>No.</th>
                <th>User ID</th>
                <th>Transaction Date</th>
                <th>Completion Date</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-center">{this.renderHistory()}</tbody>
            <tfoot></tfoot>
          </Table>
        ) : (
          <Alert>Your History is empty!</Alert>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(History);
