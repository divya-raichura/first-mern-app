// server
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
require("express-async-errors");

// security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// db
const dbConnection = require("./db/db");

// handlers import
const protect = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./errors/not-found");

// routes import
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();

// middlewares
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/goals", protect, goalRoutes);
app.use("/api/user/", protect, userRoutes);

// You should write app.use(express.static('build')) after the other app.use() statements but before the handlers, app.use(notFound) and app.use(errorHandler). This is because the order of middleware functions matters in an Express application, and you want the static file middleware to be able to handle requests before the notFound and errorHandler handlers are invoked.

// serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
}

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
