// server
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
require("express-async-errors");

// db
const dbConnection = require("./db/db");

// handlers import
const protect = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./errors/not-found");

// routes import
const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/goals", protect, goalRoutes);
app.use("/api/user/", protect, userRoutes);

// handlers
app.use(notFound);
app.use(errorHandler);

// server
async function startServer() {
  try {
    await dbConnection(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

startServer();
