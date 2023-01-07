const express = require("express");
const router = express.Router();
const {
  getGoals,
  deleteGoals,
  postGoals,
  putGoals,
  getSingleGoal,
} = require("../controllers/goalControllers");

/**
 * route: /api/goals/
 * methods: get, post
 */
router.get("/", getGoals);
router.post("/", postGoals);

/**
 * route: /api/goals/:id
 * methods: get, put, delete
 */
router.get("/:id", getSingleGoal);
router.put("/:id", putGoals);
router.delete("/:id", deleteGoals);

module.exports = router;
