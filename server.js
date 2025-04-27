const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Load env vars
dotenv.config({ path: "./.env" });

// Connect to database
const connectDB = require("./config/db");
connectDB();

// Route files
const authRoutes = require("./routes/authRoutes");
const videoReelRoutes = require("./routes/videoReelRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Initialize app
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS with dynamic origin from env
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // to allow cookies to be sent
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Mount routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/video-reels", videoReelRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// Error handling middleware
const errorHandler = require("./middleware/error");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
