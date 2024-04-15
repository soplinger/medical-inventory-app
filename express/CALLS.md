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
  - `sort` (string): Sorts the items by specified fields (e.g., `name_asc`, `qty_desc`).

### 2. Add a New Folder

- **Method:** POST
- **Endpoint:** `/inventory/addFolder`
- **Description:** Adds a new folder to the inventory system.
- **Requires Authentication:** ✅
- **Body Parameters:**
  - `name` (string): Name of the folder.
  - `parent` (integer): ID of the parent folder.

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

### 4. Fetch All Items

- **Method:** GET
- **Endpoint:** `/items`
- **Description:** Fetches all inventory items that are not archived.
- **Requires Authentication:** ❌

## Notes

- All endpoints that require authentication will use a middleware function to ensure the user is authenticated.
- Detailed error handling is implemented for each endpoint to manage various errors and provide appropriate feedback to the client.
