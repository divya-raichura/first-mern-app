const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./errors/not-found");
require("dotenv").config();
const port = process.env.PORT || 5000;
require("express-async-errors");
const goalRoutes = require("./routes/goalRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
