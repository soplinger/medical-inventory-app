import React, { Component } from "react";
import { fetchItems } from "../api/api";

class MedicalItems extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentPage: 1,
      totalPages: 0,
      limit: 10, // You can adjust the limit as needed
      pageSize: 10, // Number of buttons to show in pagination
    };
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async (page = this.state.currentPage) => {
    const { limit } = this.state;
    try {
      const data = await fetchItems(page, limit);
      if (data) {
        this.setState({
          items: data.items,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handlePageChange = (page) => {
    this.loadItems(page);
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
            className={`btn btn-sm ${currentPage === i ? 'btn-primary' : 'btn-secondary'}`}
          >
            {i}
          </button>
        );
      }

      if (startPage > 1) {
        pages.unshift(
          <button
            key={1}
            onClick={() => this.handlePageChange(1)}
            className={`btn btn-sm ${currentPage === 1 ? 'btn-primary' : 'btn-secondary'}`}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pages.unshift(<span key="ellipsis-start" className="px-2">...</span>);
        }
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(<span key="ellipsis-end" className="px-2">...</span>);
        }
        pages.push(
          <button
            key={totalPages}
            onClick={() => this.handlePageChange(totalPages)}
            className={`btn btn-sm ${currentPage === totalPages ? 'btn-primary' : 'btn-secondary'}`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  render() {
    const { items } = this.state;

    return (
      <div className="container">
        <h2 className="my-4">Medical Inventory</h2>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Item Name</th>
              <th>Ref. Number</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>Notes</th>
              <th>Alerts</th>
              <th>Archived</th>
              <th>Code</th>
              <th>Image</th>
              <th>Parent ID</th>
              <th>Reorder</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.ref || 'N/A'}</td>
                <td>{item.qty}</td>
                <td>${item.val.toFixed(2)}</td>
                <td>{item.notes || 'No notes'}</td>
                <td>{item.alerts || 'N/A'}</td>
                <td>{item.archived ? 'Yes' : 'No'}</td>
                <td>{item.code || 'N/A'}</td>
                <td>{item.img ? 'Yes' : 'No'}</td>
                <td>{item.parent}</td>
                <td>{item.reo || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          {this.renderPagination()}
        </div>
      </div>
    );
  }
}

export default MedicalItems;
