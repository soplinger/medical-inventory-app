import React, { Component } from "react";
import { fetchItems } from "../api/api";

class MedicalItems extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    try {
      const itemsData = await fetchItems();
      if (itemsData) {
        this.setState({ items: itemsData });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    const { items } = this.state;

    return (
      <div className="container">
        <h2 className="my-4">Medical Inventory</h2>
        <table className="table table-striped">
          <thead className="bg-primary text-white">
            <tr>
              <th>Item Name</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.itemExpiry}</td>
                <td>{item.quantity}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MedicalItems;
