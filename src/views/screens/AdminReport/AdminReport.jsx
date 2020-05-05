import React, { Component } from "react";
import "./AdminReport.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Table } from "reactstrap";

class AdminReport extends Component {
  state = {
    transactionList: [],
    product: [],
    listUser: []
  };

  componentDidMount() {
    this.getReportDataUser();
    this.getReportDataProduct();
  }

  getReportDataUser = () => {
    Axios.get(`${API_URL}/users`, {
      params: {
        // userId,
        role: "user",
        _embed: "transactions"
      }
    })
      .then(res => {
        this.setState({ listUser: res.data });
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getReportDataProduct = () => {
    Axios.get(`${API_URL}/products`, {
      params: {
        _embed: "transactions"
      }
    })
      .then(res => {
        console.log(res.data);
        this.setState({ product: res.data });
        this.state.product.map(val => {
          Axios.get(`${API_URL}/transactions`, {
            params: {
              _embed: "transactionsDetails"
            }
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderReportUser = () => {
    const { listUser } = this.state;
    return listUser.map(val => {
      let totalShopping = 0;
      return (
        <tr className="text-center">
          <td>{val.id}</td>
          <td>{val.fullName}</td>
          <td>
            {val.transactions.map(value => {
              if (value.userId == val.id) {
                totalShopping = totalShopping + parseInt(value.grandTotalPrice);
              } else {
                totalShopping = 0;
              }
            })}
            {totalShopping}
          </td>
        </tr>
      );
    });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

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
                <th>Fullname</th>
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
            {/* <tbody>{this.renderReportProduct()}</tbody> */}
          </table>
        </div>
      </div>
    );
  }
}

export default AdminReport;
