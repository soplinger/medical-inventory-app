import React, { useEffect, useState } from "react";
import { fetchInventoryMetrics } from "../api/api"; // Adjust the path as necessary
import Navigation from "./Navigation";

function Metrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetchInventoryMetrics()
      .then((data) => {
        setMetrics(data);
      })
      .catch((error) => {
        console.error("Failed to fetch metrics:", error);
      });
  }, []);

  if (!metrics)
    return (
      <div className="container mt-5">
        <p>Loading metrics...</p>
      </div>
    );

  return (
    <div>
      <Navigation /> {/* Include the Navigation component */}
      <div className="container mt-5">
        <h1 className="mb-4">Inventory Metrics</h1>
        <div className="row">
          <div className="col-md-3">
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">Unique Items</div>
              <div className="card-body">
                <h5 className="card-title">{metrics.uniqueItems}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success mb-3">
              <div className="card-header">Total Items</div>
              <div className="card-body">
                <h5 className="card-title">{metrics.totalItems}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-info mb-3">
              <div className="card-header">Total Value</div>
              <div className="card-body">
                <h5 className="card-title">${metrics.totalValue}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning mb-3">
              <div className="card-header">Out of Stock</div>
              <div className="card-body">
                <h5 className="card-title">{metrics.outOfStock}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Metrics;
