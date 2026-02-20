const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/connect");

// Load env variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ VERY IMPORTANT — Static folder for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/property", require("./routes/propertyRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// Default Route (Optional but good)
app.get("/", (req, res) => {
  res.send("RentEase Backend Running...");
});

// Port
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});