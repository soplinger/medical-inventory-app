import React, { useState, useEffect } from "react";
import {
  fetchAvailableDonations,
  recordDonation,
  searchDonations,
} from "../api/api";
import Navigation from "./Navigation";

const Donations = () => {
  const [availableDonations, setAvailableDonations] = useState([]);
  const [donationData, setDonationData] = useState({
    userId: "",
    donations: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Make sure this is an array

  useEffect(() => {
    const loadAvailableDonations = async () => {
      try {
        const data = await fetchAvailableDonations();
        setAvailableDonations(data || []);
      } catch (error) {
        console.error("Error fetching available donations:", error);
      }
    };
    loadAvailableDonations();
  }, []);

  const handleDonationChange = (index, field, value) => {
    const updatedDonations = donationData.donations.map((donation, i) => {
      if (i === index) {
        return { ...donation, [field]: value };
      }
      return donation;
    });
    setDonationData({ ...donationData, donations: updatedDonations });
  };

  const addDonationRow = () => {
    setDonationData({
      ...donationData,
      donations: [
        ...donationData.donations,
        { itemId: "", qty: 0, sent: "Network" },
      ],
    });
  };

  const handleSearch = async () => {
    try {
      const results = await searchDonations(
        `?search=${encodeURIComponent(searchQuery)}`
      );
      // Ensure the results are always treated as an array
      setSearchResults(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error("Error searching donations:", error);
      setSearchResults([]); // Ensure to reset to an empty array on error
    }
  };

  const handleRecordDonation = async () => {
    if (!donationData.userId || donationData.donations.length === 0) {
      console.error("User ID and donations are required.");
      return;
    }
    try {
      const response = await recordDonation(donationData);
      console.log("Donation recorded:", response);
    } catch (error) {
      console.error("Error recording donation:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Navigation />
      <h2>Record a Donation</h2>
      <div>
        <input
          type="text"
          placeholder="User ID"
          className="form-control my-2"
          value={donationData.userId}
          onChange={(e) =>
            setDonationData({ ...donationData, userId: e.target.value })
          }
        />
        {donationData.donations.map((donation, index) => (
          <div key={index} className="input-group mb-3">
            <input
              type="number"
              placeholder="Item ID"
              className="form-control"
              value={donation.itemId}
              onChange={(e) =>
                handleDonationChange(index, "itemId", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              className="form-control"
              value={donation.qty}
              onChange={(e) =>
                handleDonationChange(index, "qty", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Sent to"
              className="form-control"
              value={donation.sent}
              onChange={(e) =>
                handleDonationChange(index, "sent", e.target.value)
              }
            />
          </div>
        ))}
        <button className="btn btn-primary" onClick={addDonationRow}>
          Add Donation
        </button>
        <button className="btn btn-success" onClick={handleRecordDonation}>
          Submit Donations
        </button>
      </div>

      {/* Remove this section
      <h2 className="mt-4">Search Donations</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Search query"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-outline-secondary" onClick={handleSearch}>
          Search
        </button>
      </div>
      */}
      <ul className="list-group">
        {searchResults.map((result) => (
          <li key={result.id} className="list-group-item">
            {result.name} - Donated by: {result.userId}
          </li>
        ))}
      </ul>

      <h2 className="mt-4">Available Donations</h2>
      <div className="list-group">
        {availableDonations.map((donation) => (
          <a
            href="#"
            key={donation.id}
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{donation.name}</h5>
              <small>Qty: {donation.qty}</small>
            </div>
            <p className="mb-1">Value: {donation.val}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Donations;
