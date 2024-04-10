import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchItems = async (page = 1, limit = 10) => {
  try {
    const { data } = await API.get(`/inventory?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    console.error("Error while fetching items:", error.response);
    return null;
  }
};


// Updated to reflect the new endpoint and expected data structure
export const addMedicalSupply = async (medicalSupplyData) => {
  try {
    // Assuming '/inventory/addItem' is the updated endpoint that now also handles adding medical supplies
    const response = await API.post('http://localhost:4000/inventory/addItem', medicalSupplyData);
    return response.data;
  } catch (error) {
    console.error("Error while adding medical supply:", error.response);
    return null;
  }
};

export async function loginUser(credentials) {
  return fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export async function registerUser(userData) {
  return fetch("http://localhost:4000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => {
    if (response.ok) {
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        return response.json();
      } else {
        throw new Error("Response was not JSON");
      }
    } else {
      // Handle HTTP error responses (e.g., 400, 401, 500)
      throw new Error(`HTTP error: ${response.status}`);
    }
  });
}

export default API;
