const classRoutes = require("./routes/classRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/classes", classRoutes);
app.use("/api/registrations", registrationRoutes);
// Centralized Error Handling Middleware
app.use(errorMiddleware);

//connect mongodb and start server
const connectDB = require("./config/db");
connectDB().then(() => {
// Home API
app.get("/", (req, res) => {
    res.send("Welcome to FitZone API!");
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "FitZone Backend is working successfully!"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
});