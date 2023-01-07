const getGoals = async (req, res) => {
  res.send("<h1>getGoals</h1>");
};

const postGoals = async (req, res) => {
  res.send("<h1>postGoals</h1>");
};

const putGoals = async (req, res) => {
  res.send("<h1>putGoals</h1>");
};

const deleteGoals = async (req, res) => {
  res.send("<h1>deleteGoals</h1>");
};

module.exports = { getGoals, postGoals, putGoals, deleteGoals };
