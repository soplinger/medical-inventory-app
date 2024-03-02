import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchItems = async () => {
  try {
    const { data } = await API.get("/items");
    return data;
  } catch (error) {
    console.error("Error while fetching items:", error.response);
    return null;
  }
};

// Function to add a new medical supply
export const addMedicalSupply = async (medicalSupplyData) => {
  try {
    const response = await API.post(
      "/api/medical-supplies/add",
      medicalSupplyData
    );
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
