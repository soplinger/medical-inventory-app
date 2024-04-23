import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addMedicalSupply, fetchItems } from "../api/api";
import Navigation from "./Navigation";
import CodeScanner from "./CodeScanner";
import "../App.css";

const AddMedicalSupply = () => {
  const [medicalSupplyData, setMedicalSupplyData] = useState({
    name: "",
    parent: "",
    genericId: "",
    itemName: "",
    itemDescription: "",
    alerts: "",
    archived: 0,
    code: "",
    img: 1,
    notes: "",
    qty: 0,
    ref: "",
    reo: "",
    val: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [scannerType, setScannerType] = useState("none");
  const [showModal, setShowModal] = useState(false); // State to control the modal display

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicalSupplyData((prev) => ({ ...prev, [name]: value }));
  };

  const changeCode = (type) => {
    setScannerType(type);
    setShowModal(true); // Open the modal when a scanner type is selected
  };

  const handleModalClose = () => setShowModal(false); // Function to close the modal

  const handleSearch = async () => {
    const results = await fetchItems(1, 10, searchQuery);
    setSearchResults(results.items);
  };

  const populateForm = (item) => {
    setMedicalSupplyData(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addMedicalSupply(medicalSupplyData);
    console.log("Medical supply added:", response);
    setMedicalSupplyData({
      name: "",
      parent: "",
      genericId: "",
      itemName: "",
      itemDescription: "",
      alerts: "",
      archived: 0,
      code: "",
      img: 1,
      notes: "",
      qty: 0,
      ref: "",
      reo: "",
      val: 0,
    });
  };

  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <h2 className="mb-3">Add/Edit Medical Supply</h2>
        <div className="mb-3">
          <label htmlFor="search" className="form-label">
            Search Item
          </label>
          <input
            type="text"
            className="form-control"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="mb-3">
          <button
            className="btn btn-secondary"
            onClick={() => changeCode("barcode")}
          >
            Scan Barcode
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => changeCode("qr_code")}
          >
            Scan QR Code
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => changeCode("data_matrix")}
          >
            Scan Data Matrix
          </button>
        </div>

        {searchResults.length > 0 && (
          <ul className="list-group mb-3">
            {searchResults.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.name}
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => populateForm(item)}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        )}

        <Modal show={showModal} onHide={handleModalClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Scan Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CodeScanner
              className="camera-preview"
              scanType={scannerType}
              populateForm={populateForm}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <form onSubmit={handleSubmit}>
          {Object.entries(medicalSupplyData).map(([key, value]) => (
            <div className="mb-3" key={key}>
              <label htmlFor={key} className="form-label">
                {key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()}
              </label>
              <input
                type={typeof value === "number" ? "number" : "text"}
                className="form-control"
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicalSupply;
