# Medical Inventory Management System

This repository hosts the Medical Inventory Management System, a full-stack web application constructed using React for the frontend, Express for the backend, and MySQL for the database.

## Overview

The system is engineered to manage medical inventories by tracking item details, including check-in times, expiry dates, and maintaining a unique identifier for each item along with a general ID for item categories.

## Project Structure

    /my-project
    ├── express/            # Express backend application
    ├── react-app/          # React frontend application
    └── scripts/
        └── db-script.sql   # MySQL database build script

## Getting Started

Follow these instructions to set up a copy of the project locally for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- MySQL

### Installing

Clone the repository to your local machine:

    git clone https://github.com/soplinger/inventory-express.git
    cd inventory-express

### Setting Up the Backend

Navigate to the `express` directory:

    cd express

Install the required packages:

    npm install

Start the Express server:

    npm start

### Setting Up the Frontend

Navigate to the `react-app` directory from the root of the project:

    cd react-app

Install the required packages:

    npm install

Start the React development server:

    npm start

### Setting Up the Database

Ensure MySQL is running on your local machine.

Run the initialization script from the `scripts` directory to set up the database

## Usage

Once all parts of the application are set up, you can access:

- The React frontend at `http://localhost:3000`
- The Express backend at `http://localhost:4000`

## Development

### Backend Development

- All backend code is located in the `express` directory.
- Use `nodemon` for hot-reloading during development.

### Frontend Development

- Frontend React code is located in the `react-app` directory.
- Components, services, and state management are within the `src` folder.

### Database Management

- The MySQL script can be found in the `scripts` directory.
- Use this script to manage the database schema and initial data setup.

## Authors

- **Sean Oplinger** - _Initial work_ - [soplinger](https://github.com/soplinger)
- **John Marseglia** - _Initial work_ - [ernie357](https://github.com/ernie357)
- **David Johnson** - _Initial work_ - [DavidJJ3715](https://github.com/DavidJJ3715)
- **Henry Morales** - _Database work_ - [Skeptx](https://github.com/Skeptx)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to Henry Morales supplying the first database iteration.

