# Real-Time Stock Dashboard with Next.js & WebSocket Demo
A simple, real-time stock market dashboard built with Next.js and WebSocket API 
to fetch live stock data. This guide walks you through setting up and running the project locally.

## Getting Started
Prerequisites
Ensure you have the following installed:

- Node.js (v14 or higher recommended)
- npm (or pnpm)

## Installation
- Clone the Repository:
```bash
git clone https://github.com/sajanv88/nextjs-websocket-demo.git
cd real-time-stock-nextjs
```
- Install Dependencies:
```bash
npm install
```
This will install all required dependencies, including:
- ws - for WebSocket connections
- recharts - for visualizing stock data
- nodemon - for auto-restarting the server
- ts-node - for running TypeScript files

## Configuration
TypeScript Configuration:
In `tsconfig.server.json`, extend the base tsconfig.json file and set the necessary compiler options for the custom server.

## Nodemon Configuration:
In `nodemon.json`, specify which files to monitor for changes, how to execute the project, and which file extensions to include.

## Signup Polygon.io API:
- Go to [Polygon.io](https://polygon.io/) and sign up for a free account.

- Create a `.env` file in the root directory and add the following line:
```bash
POLYGON_API_KEY=<replace with your key>
```

## Running the Project
- Start the Server:
    - To enable automatic restarts, use nodemon:
      - `npm run dev`

Check out my [YouTube channel](https://youtu.be/MG2TF_kb4PY) for a full tutorial!