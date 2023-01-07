const notFound =
  ("/",
  (req, res) =>
    res.status(404).send("Page you were looking for was not found :("));

module.exports = notFound;
