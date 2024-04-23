/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * MedicalItems.js
 * Description: Page that displays the medical items in the inventory.
 *****************************************************************/

import React, { Component } from "react";
import { fetchItems } from "../api/api";
import Navigation from "./Navigation";

class MedicalItems extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentPage: 1,
      totalPages: 0,
      limit: 10,
      pageSize: 10,
      searchQuery: "", // Added to handle search queries
    };
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async (page = this.state.currentPage) => {
    const { limit, searchQuery } = this.state;
    try {
      const data = await fetchItems(page, limit, searchQuery); // Updated to include searchQuery
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

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    this.setState({ currentPage: 1 }, () => {
      this.loadItems(1);
    });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  // Update the selected category filter
  handleCategoryChange = (event) => {
    this.setState({ selectedCategory: event.target.value });
  };

  // Apply filters and reload data
  applyFilters = () => {
    this.toggleModal();
    this.loadItems();
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleSearch();
    }
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
            key={1}
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

    return pages;
  };

  render() {
    const { items, searchQuery, showModal } = this.state;

    return (
      <div>
        <Navigation /> {/* Include the Navigation component */}
        <div className="container">
          <h2 className="my-4">Medical Inventory</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search items"
              value={searchQuery}
              onChange={this.handleSearchChange}
              onKeyDown={this.handleKeyDown}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.handleSearch}
              >
                Search
              </button>
            </div>
            <div className="input-group-append">
              {/*Filter Button*/}
              <button className="btn btn-primary" onClick={this.toggleModal}>
                Filter
              </button>
            </div>
          </div>
          {/* Modal component */}
          {showModal && (
            <div
              className="modal"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Select Filter</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={this.toggleModal}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="category">Category:</label>
                      <select className="form-control" id="category">
                        <option value="No Filter">No Filter</option>
                        <option value="Quantity Low to High">
                          Quantity Low to High
                        </option>
                        <option value="Quantity High to Low">
                          Quantity High to Low
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={this.toggleModal}
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Item Name</th>
                  <th>Ref. Number</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Notes</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.ref || "N/A"}</td>
                    <td>{item.qty}</td>
                    <td>${item.val.toFixed(2)}</td>
                    <td>{item.notes || "No notes"}</td>
                    <td>{item.code || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            {this.renderPagination()}
          </div>
        </div>
      </div>
    );
  }
}

export default MedicalItems;
