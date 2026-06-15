// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config(); // Load variables from .env file

const corsOptions = {
  origin: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
    : [
        "https://farrukhabadngo.com",
        "https://www.farrukhabadngo.com",
        "http://localhost:3000",
        "http://localhost:3001",
      ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads")); // Serve static files from the 'uploads' directory

app.use(express.json()); // JSON parsing middleware
// Connect to MongoDB using the environment variable
// console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// console.log(process.env.MONGODB_URI);
// Routes
const uploadRoutes = require("./uploadHandler");
const imageRoutes = require("./imageRoutes");
const donateRoutes = require("./donateRoutes");

app.use("/upload", uploadRoutes);
app.use("/images", imageRoutes);
app.use("/donate", donateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// const PORT = 5000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
