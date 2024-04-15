# Inventory API Endpoints Documentation

This document provides an overview of the API endpoints available for managing inventory items within the Express server application.

## API Authentication Endpoints

### 1. Login

- **Method:** POST
- **Endpoint:** `/login`
- **Description:** Authenticates a user by checking provided credentials against stored data, and returns a JWT token upon successful authentication.
- **Requires Authentication:** ❌
- **Body Parameters:**
  - `email` (string): The email address of the user attempting to log in.
  - `password` (string): The password for the account.
- **Example Request:**
  ```json
  {
    "email": "jane.doe@example.com",
    "password": "SecurePassword123"
  }
  ```

### 2. Register

- **Method:** POST
- **Endpoint:** `/register`
- **Description:** Registers a new user with details provided in the request body. Checks for existing users with the same email to prevent duplicates.
- **Requires Authentication:** ❌
- **Body Parameters:**
  - `email` (string): Email address of the new user.
  - `password` (string): Password for the new user.
  - `first` (string): First name of the new user.
  - `last` (string): Last name of the new user.
  - `role` (string): Role assigned to the new user.
- **Example Request**
  ```json
  {
    "email": "john.smith@example.com",
    "password": "NewSecurePassword789",
    "first": "John",
    "last": "Smith",
    "role": "User"
  }
  ```

## Notes

- The `/login` endpoint uses bcrypt to verify passwords and jwt for token generation.
- The `/register` endpoint handles password hashing with bcrypt and stores user details including IP address logs.
- Errors are handled appropriately to give clear feedback for both successful operations and issues (e.g., user already exists, invalid credentials).

## Implementation Details

- JWT tokens are configured to expire in 1 hour.
- Passwords are hashed using bcrypt with a salt for enhanced security.
- User registration includes logging the IP address and the time of registration, stored in the user's record.

## API Donation Endpoints

### 1. Fetch Available Donations

- **Method:** GET
- **Endpoint:** `/donations/available`
- **Description:** Fetches available donation items with non-zero quantities that are not archived.
- **Requires Authentication:** ✅
- **Example Request:**
  ```plaintext
  GET /donations/available
  ```

### 2. Record Donations

- **Method:** POST
- **Endpoint:** `/donations`
- **Description:** Records donations made by users.
- **Requires Authentication:** ✅
- **Body Parameters:**
  - `userId` (string): ID of the user making the donation.
  - `donations` (array): An array of donation objects, each containing:
    - `itemId` (integer): ID of the donated item.
    - `qty` (integer): Quantity of the donated item.
    - `sent` (string, optional): Destination of the donation (defaulted to 'Network' if not provided).
- **Example Request:**
  ```json
  {
    "userId": "user123",
    "donations": [
      {
        "itemId": 1,
        "qty": 5,
        "sent": "Ukraine"
      },
      {
        "itemId": 2,
        "qty": 10
      }
    ]
  }
  ```

### 3. Search Donations

- **Method:** GET
- **Endpoint:** `/donations/search`
- **Description:** Searches donations with optional pagination, sorting, and search parameters.
- **Requires Authentication:** ✅
- **Query Parameters:**
  - `page` (integer): Specifies the page number in pagination.
  - `limit` (integer): Specifies the number of items per page.
  - `search` (string): Filters donations by item name or user.
  - `sort` (string): Sorts the donations by specified fields (e.g., `time_asc`, `qty_desc`).
- **Sort Keys:**
  - **Time** (`time`): Sorts by the time of donation.
    - Ascending: `sort=time_asc`
    - Descending: `sort=time_desc`
  - **Quantity** (`qty`): Sorts by the quantity of donated items.
    - Ascending: `sort=qty_asc`
    - Descending: `sort=qty_desc`
  - **Value** (`val`): Sorts by the value of the donated items.
    - Ascending: `sort=val_asc`
    - Descending: `sort=val_desc`
  - **Sent** (`sent`): Sorts by the destination of the donation.
    - Ascending: `sort=sent_asc`
    - Descending: `sort=sent_desc`
- **Example Request:**
  ```plaintext
  GET /donations/search?page=1&limit=10&search=medicine&sort=time_desc
  ```

## API Inventory Endpoints

### 1. Fetch Inventory Items

- **Method:** GET
- **Endpoint:** `/inventory`
- **Description:** Fetches paginated inventory items with optional search and sorting parameters.
- **Requires Authentication:** ✅
- **Query Parameters:**
  - `page` (integer): Specifies the page number in pagination.
  - `limit` (integer): Specifies the number of items per page.
  - `search` (string): Filters items by the name field.
  - `id` (integer): Filters items by id
  - `sort` (string): Sorts the items by specified fields (e.g., `name_asc`, `qty_desc`).
- **Sort Keys:**
  - **Name** (`name`): Sorts alphabetically by item name.
    - Ascending: `sort=name_asc`
    - Descending: `sort=name_desc`
  - **Quantity** (`qty`): Sorts by the quantity in stock.
    - Ascending: `sort=qty_asc`
    - Descending: `sort=qty_desc`
  - **Value** (`val`): Sorts by the value of the items.
    - Ascending: `sort=val_asc`
    - Descending: `sort=val_desc`
  - **ID** (`id`): Sorts by the item's database ID.
    - Ascending: `sort=id_asc`
    - Descending: `sort=id_desc`
- **Example Request:**
  ```plaintext
  GET /inventory?page=1&limit=10&search=widget&sort=name_asc
  ```

### 2. Add a New Folder

- **Method:** POST
- **Endpoint:** `/inventory/addFolder`
- **Description:** Adds a new folder to the inventory system.
- **Requires Authentication:** ✅
- **Body Parameters:**
  - `name` (string): Name of the folder.
  - `parent` (integer): ID of the parent folder.
- **Example Request:**

```json
{
  "name": "Electronics",
  "parent": 1
}
```

### 3. Add a New Item

- **Method:** POST
- **Endpoint:** `/inventory/addItem`
- **Description:** Adds a new item to the inventory system.
- **Requires Authentication:** ✅
- **Body Parameters:**
  - `name` (string): Name of the item.
  - `parent` (integer): ID of the parent item or category.
  - `alerts` (integer, optional): Alert status.
  - `archived` (integer, default: 0): Archive status.
  - `code` (string, optional): Item code.
  - `img` (integer, default: 1): Image identifier.
  - `notes` (string, optional): Additional notes.
  - `qty` (integer, default: 0): Quantity in stock.
  - `ref` (string, optional): Reference link or identifier.
  - `reo` (integer, optional): Reorder level.
  - `val` (integer, default: 0): Value of the item.
- **Example Request:**

```json
{
  "name": "New Widget",
  "parent": 2,
  "archived": 0,
  "code": "NW123",
  "img": 1,
  "notes": "Latest model",
  "qty": 100,
  "ref": "http://example.com/new-widget",
  "reo": 10,
  "val": 15
}
```

### 4. Fetch All Items

- **Method:** GET
- **Endpoint:** `/items`
- **Description:** Fetches all inventory items that are not archived.
- **Requires Authentication:** ❌
- **Example Request:**

```plaintext
GET /items
```

### 5. Fetch Inventory Metrics

- **Method:** GET
- **Endpoint:** `/inventory/metrics`
- **Description:** Retrieves metrics about the inventory items, including counts of unique and total items, the total value of all items, and the number of out-of-stock items.
- **Requires Authentication:** ✅
- **Example Request:**
  ```plaintext
  GET /inventory/metrics
  ```

## Notes

- All endpoints that require authentication will use a middleware function to ensure the user is authenticated.
- Detailed error handling is implemented for each endpoint to manage various errors and provide appropriate feedback to the client.
