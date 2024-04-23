import React, { useState } from "react";
import {
  fetchAvailableDonations,
  recordDonation,
  searchDonations,
} from "../api/api";
import Navigation from "./Navigation";

const Donations = () => {
  const [donationData, setDonationData] = useState({
    userId: "",
    donations: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
    if (!searchQuery) {
      console.log("Please enter a search query.");
      return;
    }
    try {
      const results = await fetchAvailableDonations(searchQuery);
      setSearchResults(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error("Error searching available donations:", error);
      setSearchResults([]);
    }
  };

  const populateForm = (item) => {
    setDonationData({
      ...donationData,
      donations: [
        ...donationData.donations,
        { itemId: item.id, qty: 1, sent: "Network" }, // Assuming 'Network' as a default 'sent to' value
      ],
    });
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
    <div>
      <Navigation />
      <div className="container mt-5">
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

        <h2 className="mt-4">Search for Donatable Items</h2>
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
        <ul className="list-group">
          {searchResults.map((result) => (
            <li key={result.id} className="list-group-item">
              {result.name} - Available Qty: {result.qty}
              <button
                className="btn btn-sm btn-primary"
                onClick={() => populateForm(result)}
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Donations;
