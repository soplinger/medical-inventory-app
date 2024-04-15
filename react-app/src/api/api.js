/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * api.js
 * Description: API calls for the React client.
 *****************************************************************/

import axios from "axios";

const baseURL = 'http://localhost:3000/api';

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

// Improved error handling and logging
const handleResponse = response => {
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`HTTP error: ${response.status}`);
  }
};

const handleError = (error) => {
  console.error("API Error:", error.response || error.message);
  return null;  // Return a consistent error object or message if needed
};

export const fetchItems = async (page = 1, limit = 10, searchQuery = '') => {
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
    const response = await API.post('/inventory/addItem', medicalSupplyData);
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


export default API;
