const readline = require("readline");
const { MongoClient, ObjectId } = require("mongodb");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const medicalEquipmentNames = [
  "Stethoscope",
  "Blood Pressure Cuff",
  "Otoscope",
  "Thermometer",
  "Defibrillator",
  "Surgical Mask",
  "Syringe",
  "Scalpel",
  "Bandage",
  "Gauze Pad",
  "IV Bag",
  "Medical Gloves",
  "Wheelchair",
  "Crutches",
  "Sling",
  "Splint",
  "Oxygen Mask",
  "Ventilator",
  "Pulse Oximeter",
  "Catheter",
  "ECG Machine",
  "Ultrasound Machine",
  "X-Ray Machine",
  "MRI Scanner",
  "CT Scanner",
  "Pacemaker",
  "Forceps",
  "Suture Kit",
  "Kidney Dish",
  "Medical Tape",
];

function getRandomDate(start, end) {
  const startDate = start.getTime();
  const endDate = end.getTime();
  const randomTime = Math.random() * (endDate - startDate) + startDate;
  return new Date(randomTime);
}

rl.question("Enter your MongoDB connection string: ", async (uri) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("inventoryDB");
    const items = database.collection("items");

    const dummyItems = [];
    for (let i = 0; i < 50; i++) {
      const nameIndex = Math.floor(
        Math.random() * medicalEquipmentNames.length
      );
      dummyItems.push({
        _id: new ObjectId(), // Generate a new ObjectId for each item
        genericId: `generic-id-${nameIndex + 1}`,
        itemName: medicalEquipmentNames[nameIndex],
        itemDescription: `Description for ${medicalEquipmentNames[nameIndex]}`,
        itemCheckedIn: new Date().toISOString(),
        itemExpiry: getRandomDate(
          new Date(),
          new Date(2025, 11, 31)
        ).toISOString(),
        quantity: Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 10
        unit: ["mg", "ml", "packets"][Math.floor(Math.random() * 3)], // Random unit
        batchNumber: `batch-${i + 1}`,
        location: `Location ${i + 1}`,
        status: ["in stock", "low stock", "out of stock"][
          Math.floor(Math.random() * 3)
        ], // Random status
        additionalInfo: {
          createdBy: "John Doe", // Replace with actual user info
          createdAt: new Date().toISOString(),
          modifiedBy: "Jane Smith", // Replace with actual user info
          modifiedAt: new Date().toISOString(),
        },
      });
    }

    const result = await items.insertMany(dummyItems);
    console.log(`${result.insertedCount} dummy items inserted`);
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    await client.close();
    rl.close();
  }
});
