import React, { Component } from "react";
import "./AdminReport.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class AdminReport extends Component {
  state = {
    transactionList: [],
    modalOpen: false,
    dateCalendar: new Date(),
    reportDataUser: []
  };

  getTransactionList = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        status: "completed"
      }
    })
      .then(res => {
        this.setState({ transactionList: res.data });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getReportDataUser = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        status: "completed",
        _embed: "transactionDetails"
      }
    })
      .then(res => {
        this.setState({ reportDataUser: res.data });
        console.log(`${res.data}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderReportUser = () => {
    // console.log(valUser.productName);
    console.log(this.state.reportDataUser);
    return this.state.reportDataUser.map((val, idx) => {
      const { id, userId, transactionDetails } = val;

      return (
        <>
          <tr className="text-center">
            <td> {idx + 1} </td>
            <td> {userId} </td>
            <td></td>{" "}
          </tr>
        </>
      );
    });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getReportDataUser();
  }

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>User Report</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr className="text-center">
                <th>No.</th>
                <th>User ID</th>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>{this.renderReportUser()}</tbody>
          </table>
          <br />
          <br />
          <caption className="p-3">
            <h2>Product Report</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr className="text-center">
                <th>No.</th>
                <th>Nama Product</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>{this.renderReportUser()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdminReport;
