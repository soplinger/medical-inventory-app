# Inventory Item Schema

The inventory items are stored in the `items` collection with the following schema:

- `_id`: ObjectId - Auto-generated unique ID for each document (item)
- `genericId`: String - A shared identifier for grouping similar items
- `itemName`: String - The name of the item
- `itemDescription`: String - A brief description of the item
- `itemCheckedIn`: Date - The date and time the item was added to the inventory
- `itemExpiry`: Date - The expiry date of the item
- `quantity`: Number - The quantity of items available
- `unit`: String - Unit of measurement (e.g., "mg", "ml", "packets")
- `batchNumber`: String - Batch number for tracking production/shipment batches
- `location`: String - Storage location within the facility
- `status`: String - Status of the item (e.g., "in stock", "low stock", "out of stock")
- `additionalInfo`: Mixed - A field for any additional information, can store a mixed type of data

Each item also includes fields for tracking and auditing, such as timestamps and user information for the creation and last modification.
