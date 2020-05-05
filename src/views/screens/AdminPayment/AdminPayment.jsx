import React from "react";
import "./AdminPayment.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class AdminPayment extends React.Component {
  state = {
    transactionList: [],
    modalOpen: false,
    dateCalendar: new Date()
  };

  getTransactionList = () => {
    Axios.get(`${API_URL}/transactions`)
      .then(res => {
        this.setState({ transactionList: res.data });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderTransactionList = () => {
    console.log(this.state.transactionList);
    return this.state.transactionList.map((val, idx) => {
      const {
        id,
        userId,
        totalPrice,
        status,
        transactionDate,
        CompletionDate
      } = val;

      return (
        <>
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
            <td>
              {" "}
              <ButtonUI
                onClick={() => this.confirmPayment(id)}
                className="w-80"
                type="contained"
              >
                Confirm Payment
              </ButtonUI>
            </td>
          </tr>
        </>
      );
    });
  };

  confirmPayment = id => {
    Axios.patch(`${API_URL}/transactions/${id}`, {
      status: "completed",
      CompletionDate: this.state.dateCalendar.toLocaleDateString()
    })

      .then(res => {
        swal("Success!", "The Transaction has been confirmed", "success");
        this.getTransactionList();
      })
      .catch(err => {
        console.log(err);
      });
    console.log(` tgl ${this.state.dateCalendar.toLocaleDateString()}`);
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getTransactionList();
  }

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Payment</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr className="text-center">
                <th>No.</th>
                <th>User ID</th>
                <th>Transaction Date</th>
                <th>Completion Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderTransactionList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdminPayment;
