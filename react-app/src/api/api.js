/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * api.js
 * Description: API calls for the React client.
 *****************************************************************/

import axios from "axios";

const baseURL = "http://localhost:4000/api";

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Improved error handling and logging
const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`HTTP error: ${response.status}`);
  }
};

const handleError = (error) => {
  console.error("API Error:", error.response || error.message);
  return null; // Return a consistent error object or message if needed
};

export const fetchItems = async (page = 1, limit = 10, searchQuery = "") => {
  try {
    let queryParams = `?page=${page}&limit=${limit}`;
    if (searchQuery) {
      queryParams += `&search=${encodeURIComponent(searchQuery)}`;
    }

    const response = await API.get(`/inventory${queryParams}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const addMedicalSupply = async (medicalSupplyData) => {
  try {
    const response = await API.post("/inventory/addItem", medicalSupplyData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const fetchInventoryMetrics = async () => {
  try {
    const response = await API.get("/inventory/metrics");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export async function loginUser(credentials) {
  try {
    const response = await API.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response);
    return null;
  }
}

export async function registerUser(userData) {
  try {
    const response = await API.post("/register", userData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error("Registration error:", error.response);
    return null;
  }
}

// Fetch available donations
// In api.js
// Fetch available donations
export const fetchAvailableDonations = async (searchQuery = "") => {
  try {
    const response = await API.get(
      `/donations/available?search=${encodeURIComponent(searchQuery)}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch available donations:", error);
    return handleError(error);
  }
};

// Record donations made by users
export const recordDonation = async (donationData) => {
  try {
    const response = await API.post("/donations/donate", donationData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Search donations
export const searchDonations = async (searchParams) => {
  try {
    const response = await API.get(`/donations/search${searchParams}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const addHistoryRecord = async (historyData) => {
  try {
    const response = await API.post("/history/add", historyData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const fetchHistoryLogs = async ({
  page = 1,
  limit = 10,
  sort = "time_desc",
}) => {
  try {
    const queryParams = `?page=${page}&limit=${limit}&sort=${encodeURIComponent(
      sort
    )}`;
    const response = await API.get(`/history/logs${queryParams}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export async function getItemById(itemId) {
  try {
    const response = await API.post("/item", { itemId: itemId });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error("SQL Item Code Query Error: ", error.response);
    return null;
  }
}

export const logoutUser = async () => {
  try {
    const response = await API.post("/logout");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const isAdmin = async () => {
  try {
    const response = await API.get("/isAdmin"); // Making a GET request to check admin status
    return handleResponse(response); // Handle response using the predefined function
  } catch (error) {
    return handleError(error); // Handle any errors that occur
  }
};

export default API;
