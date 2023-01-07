const Goal = require("../models/Goal");

/**
 * @desc Get all tasks
 * @route GET /api/goals
 * @access Private
 */
const getGoals = async (req, res) => {
  const goals = await Goal.find({});
  res.status(200).json(goals);
};

/**
 * @desc Get single tasks
 * @route GET /api/goals/:id
 * @access Private
 */
const getSingleGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  res.status(200).json(goal);
};

/**
 * @desc Set task
 * @route POST /api/goals
 * @access Private
 */
const postGoals = async (req, res) => {
  const { title, dueDate, description, priority } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title field is required");
  }

  const goal = await Goal.create({ title, dueDate, description, priority });

  res.status(200).json(goal);
};

/**
 * @desc Update task
 * @route PUT /api/goals/:id
 * @access Private
 */
const putGoals = async (req, res) => {
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  res.status(201).json(updatedGoal);
};

/**
 * @desc Delete task
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoals = async (req, res) => {
  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  if (!deletedGoal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  res.status(200).json(deletedGoal);
};

module.exports = { getGoals, postGoals, putGoals, deleteGoals, getSingleGoal };
