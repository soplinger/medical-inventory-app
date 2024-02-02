import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/",
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

export default API;
