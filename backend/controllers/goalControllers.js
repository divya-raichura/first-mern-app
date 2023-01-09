const Goal = require("../models/Goal");

/**
 * @desc Get all tasks
 * @route GET /api/goals
 * @access Private
 */
const getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user.userId });
  res.status(200).json({ goals });
};

/**
 * @desc Get single tasks
 * @route GET /api/goals/:id
 * @access Private
 */
const getSingleGoal = async (req, res) => {
  const goal = await Goal.findOne({
    _id: req.params.id,
    user: req.user.userId,
  });

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  res.status(200).json({ goal });
};

/**
 * @desc Set task
 * @route POST /api/goals
 * @access Private
 */
const postGoals = async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Title field is required");
  }

  const goal = await Goal.create(req.body);

  res.status(200).json({ goal });
};

/**
 * @desc Update task
 * @route PUT /api/goals/:id
 * @access Private
 */
const putGoals = async (req, res) => {
  const updatedGoal = await Goal.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedGoal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  res.status(200).json({ goal: updatedGoal });
};

/**
 * @desc Delete task
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoals = async (req, res) => {
  const deletedGoal = await Goal.findOneAndDelete({
    _id: req.params.id,
    user: req.user.userId,
  });

  if (!deletedGoal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  res.status(200).json({ goal: deletedGoal });
};

module.exports = { getGoals, postGoals, putGoals, deleteGoals, getSingleGoal };
