const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.send("error hai yaha");
};

module.exports = errorHandler;
