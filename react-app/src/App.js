import React, { useEffect, useState } from "react";
import { fetchItems } from "./api/api"; // Adjust the import path based on where you placed api.js

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemsData = await fetchItems();
      if (itemsData) {
        setItems(itemsData);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Inventory System</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.itemName} - Expiry: {item.itemExpiry}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
