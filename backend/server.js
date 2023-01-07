const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./errors/not-found");
require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConnection = require("./db/db");
require("express-async-errors");
const goalRoutes = require("./routes/goalRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await dbConnection(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

startServer();
