/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors'); // Importing CORS middleware
const dotenv = require('dotenv'); // Importing environment variables

// Importing routes
const userRoutes = require('../routes/userRoutes');
const employeeRoutes = require('../routes/employeeRoutes')

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
//configuring cors to only accept requests from a particular domain
// const corsOptions = {
//     origin: ["http://localhost:5173", "https://employee-management-system-fullstack.vercel.app/"], // Frontend origin (Vite default port)
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   };
// app.use(cors(corsOptions)); // Enable CORS for all routes

const corsOptions = {
  origin: ["http://localhost:5173", "https://employee-management-system-fullstack.vercel.app"], // ✅ Removed trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow headers for authentication
  credentials: true, // ✅ Allow cookies and authentication headers
};

app.use(cors(corsOptions)); // ✅ Apply CORS globally


app.use(express.json()); // Parse JSON bodies

// app.use(express.json({ limit: "10mb" })); // Increase JSON body limit to 5MB
// app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Increase form data size

// Routes
app.use('/auth', userRoutes)
app.use('/employees', employeeRoutes)

// Export the app instance
module.exports = app;

