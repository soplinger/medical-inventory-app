import React, { Component } from "react";
import { fetchHistoryLogs } from "../api/api";
import Navigation from "./Navigation";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      currentPage: 1,
      totalPages: 0,
      limit: 10, // You can adjust this based on how many logs you want per page
      pageSize: 5, // Number of pages you want to show in the pagination control
    };
  }

  componentDidMount() {
    this.loadHistoryLogs();
  }

  loadHistoryLogs = async (page = this.state.currentPage) => {
    try {
      const data = await fetchHistoryLogs({ page, limit: this.state.limit });
      if (data) {
        this.setState({
          logs: data.items,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        });
      }
    } catch (error) {
      console.error("Error fetching history logs:", error);
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.loadHistoryLogs(page);
    });
  };

  renderPagination = () => {
    const { totalPages, currentPage, pageSize } = this.state;
    let pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
    let endPage = Math.min(totalPages, startPage + pageSize - 1);

    if (totalPages > 1) {
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => this.handlePageChange(i)}
            className={`btn btn-sm ${
              currentPage === i ? "btn-primary" : "btn-secondary"
            }`}
          >
            {i}
          </button>
        );
      }

      if (startPage > 1) {
        pages.unshift(
          <button
            key="1"
            onClick={() => this.handlePageChange(1)}
            className={`btn btn-sm ${
              currentPage === 1 ? "btn-primary" : "btn-secondary"
            }`}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pages.unshift(
            <span key="ellipsis-start" className="px-2">
              ...
            </span>
          );
        }
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(
            <span key="ellipsis-end" className="px-2">
              ...
            </span>
          );
        }
        pages.push(
          <button
            key={totalPages}
            onClick={() => this.handlePageChange(totalPages)}
            className={`btn btn-sm ${
              currentPage === totalPages ? "btn-primary" : "btn-secondary"
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return <div className="pagination my-3">{pages}</div>;
  };

  render() {
    const { logs } = this.state;
    return (
      <div>
        <Navigation /> {/* Include the Navigation component */}
        <div className="container">
          <h2 className="my-4">History Logs</h2>
          <div className="row">
            {logs.map((log) => (
              <div className="col-12 mb-4" key={log.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{log.itemName}</h5>
                    <p className="card-text">Item ID: {log.item}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Logged Time: {new Date(log.time).toLocaleString()}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">User ID: {log.user}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {this.renderPagination()}
        </div>
      </div>
    );
  }
}

export default History;
