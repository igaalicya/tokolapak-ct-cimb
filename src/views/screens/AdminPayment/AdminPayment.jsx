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
    transactionCompleted: [],
    transactionPending: [],
    transactionList: [],
    modalOpen: false,
    dateCalendar: new Date(),
    activeProducts: [],
    activePage: "completed"
  };

  getTransactionCompleted = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        status: "completed"
      }
    })
      .then(res => {
        this.setState({ transactionCompleted: res.data });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getTransactionPending = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        status: "pending"
      }
    })
      .then(res => {
        this.setState({ transactionPending: res.data });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderTransactionList = () => {
    const { activePage } = this.state;
    if (activePage == "completed") {
      console.log(this.state.transactionCompleted);
      return this.state.transactionCompleted.map((val, idx) => {
        const {
          id,
          userId,
          grandTotalPrice,
          status,
          transactionDate,
          CompletionDate
        } = val;

        return (
          <>
            <tr
              className="text-center"
              onClick={() => {
                if (this.state.activeProducts.includes(idx)) {
                  this.setState({
                    activeProducts: [
                      ...this.state.activeProducts.filter(item => item !== idx)
                    ]
                  });
                } else {
                  this.setState({
                    activeProducts: [...this.state.activeProducts, idx]
                  });
                }
              }}
            >
              <td> {idx + 1} </td>
              <td> {userId} </td>
              <td>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR"
                }).format(grandTotalPrice)}{" "}
              </td>
              <td>{status}</td>
              <td>
                {" "}
                {/* <ButtonUI
                  onClick={() => this.confirmPayment(id)}
                  className="w-80"
                  type="outlined"
                >
                  Confirm Payment
                </ButtonUI> */}
                <input
                  type="button"
                  className="btn btn-primary"
                  value="Confirm Payment"
                  disabled
                />
              </td>
            </tr>
            <tr
              className={`collapse-item ${
                this.state.activeProducts.includes(idx) ? "active" : null
              }`}
            >
              <td className="" colSpan={3}>
                <div className="d-flex justify-content-around align-items-center">
                  <div className="d-flex">
                    <div className="d-flex flex-column ml-4 justify-content-center">
                      {/* <h5>{transactionDate}</h5> */}
                      <h6 className="mt-2">
                        Transaction Date:
                        <span style={{ fontWeight: "normal" }}>
                          {" "}
                          {transactionDate}
                        </span>
                      </h6>
                      <h6>
                        Price:
                        <span
                          style={{ fontWeight: "normal" }}
                          className="text-justify"
                        >
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR"
                          }).format(grandTotalPrice)}
                        </span>
                      </h6>
                      <h6>
                        Completion Date:
                        <span
                          style={{ fontWeight: "normal" }}
                          className="text-justify"
                        >
                          {CompletionDate}
                        </span>
                      </h6>
                      <h6>
                        Total Price:
                        <span
                          style={{ fontWeight: "normal" }}
                          className="text-justify"
                        >
                          {grandTotalPrice}
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </>
        );
      });
    } else {
      console.log(this.state.transactionPending);
      return this.state.transactionPending.map((val, idx) => {
        const {
          id,
          userId,
          grandTotalPrice,
          status,
          transactionDate,
          CompletionDate
        } = val;

        return (
          <>
            <tr
              className="text-center"
              onClick={() => {
                if (this.state.activeProducts.includes(idx)) {
                  this.setState({
                    activeProducts: [
                      ...this.state.activeProducts.filter(item => item !== idx)
                    ]
                  });
                } else {
                  this.setState({
                    activeProducts: [...this.state.activeProducts, idx]
                  });
                }
              }}
            >
              <td> {idx + 1} </td>
              <td> {userId} </td>
              <td>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR"
                }).format(grandTotalPrice)}{" "}
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
            <tr
              className={`collapse-item ${
                this.state.activeProducts.includes(idx) ? "active" : null
              }`}
            >
              <td className="" colSpan={3}>
                <div className="d-flex justify-content-around align-items-center">
                  <div className="d-flex">
                    <div className="d-flex flex-column ml-4 justify-content-center">
                      {/* <h5>{transactionDate}</h5> */}
                      <h6 className="mt-2">
                        Transaction Date:
                        <span style={{ fontWeight: "normal" }}>
                          {" "}
                          {transactionDate}
                        </span>
                      </h6>
                      <h6>
                        Price:
                        <span
                          style={{ fontWeight: "normal" }}
                          className="text-justify"
                        >
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR"
                          }).format(grandTotalPrice)}
                        </span>
                      </h6>
                      <h6>
                        Completion Date:
                        <span
                          style={{ fontWeight: "normal" }}
                          className="text-justify"
                        >
                          {CompletionDate}
                        </span>
                      </h6>
                      <h6>
                        Total Price:
                        <span
                          style={{ fontWeight: "normal" }}
                          className="text-justify"
                        >
                          {grandTotalPrice}
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </>
        );
      });
    }
  };

  confirmPayment = id => {
    Axios.patch(`${API_URL}/transactions/${id}`, {
      status: "completed",
      CompletionDate: this.state.dateCalendar.toLocaleDateString()
    })

      .then(res => {
        swal("Success!", "The Transaction has been confirmed", "success");
        this.getTransactionPending();
        this.getTransactionCompleted();
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
    this.getTransactionCompleted();
    this.getTransactionPending();
  }

  render() {
    return (
      <div className="container py-4">
        <div className="d-flex flex-row">
          <ButtonUI
            className={`auth-screen-btn ${
              this.state.activePage == "completed" ? "active" : null
            }`}
            type="outlined"
            onClick={() => this.setState({ activePage: "completed" })}
          >
            Completed
          </ButtonUI>
          <ButtonUI
            className={`ml-3 auth-screen-btn ${
              this.state.activePage == "pending" ? "active" : null
            }`}
            type="outlined"
            onClick={() => this.setState({ activePage: "pending" })}
          >
            Pending
          </ButtonUI>
        </div>
        <div className="dashboard mt-5">
          <caption className="p-3">
            <h2>Payment</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr className="text-center">
                <th>No.</th>
                <th>User ID</th>
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
