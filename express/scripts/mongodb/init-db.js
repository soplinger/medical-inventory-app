const { MongoClient } = require("mongodb");

// MongoDB connection string
const uri = "mongodb://localhost:27017"; // Replace with your connection string
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("inventoryDB");
    const items = database.collection("items");

    // Generate dummy items
    const dummyItems = Array.from({ length: 20 }, (_, index) => ({
      itemName: `Medicine ${index + 1}`,
      itemCheckedIn: new Date().toISOString(),
      itemExpiry: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString(),
      itemUnique: `unique-id-${index + 1}`,
    }));

    // Insert dummy items into the collection
    const result = await items.insertMany(dummyItems);
    console.log(`${result.insertedCount} dummy items inserted`);
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    await client.close();
  }
}

run();
