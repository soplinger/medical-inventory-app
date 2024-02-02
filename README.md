# Medical Inventory Management System

This repository contains the Medical Inventory Management System, a full-stack web application built with React, Express, and MongoDB.

## Overview

The system is designed to track medical items, their check-in times, expiry dates, and maintain a unique identifier for each item along with a generic ID for item types.

## Project Structure

    /my-project
    ├── express/            # Express backend application
    ├── react-app/          # React frontend application
    └── scripts/
        └── mongodb/        # MongoDB scripts

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

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

Ensure MongoDB is running on your local machine.

Run the initialization script from the `scripts/mongodb` directory to set up the database and seed it with initial data:

    node init-db.js

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

- MongoDB scripts can be found in the `scripts/mongodb` directory.
- Use these scripts to manage the database schema and initial data setup.

## Authors

- **Sean Oplinger** - _Initial work_ - [soplinger](https://github.com/soplinger)

See also the list of [contributors](https://github.com/yourusername/your-repo-name/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
