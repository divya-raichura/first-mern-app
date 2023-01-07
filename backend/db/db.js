const mongoose = require("mongoose");

function connectDB(url) {
  mongoose.set("strictQuery", false);

  return mongoose.connect(url);
}

module.exports = connectDB;
