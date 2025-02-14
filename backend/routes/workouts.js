const express = require("express");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect routes
router.get("/", authMiddleware, getWorkouts);
router.get("/:id", authMiddleware, getWorkout);
router.post("/", authMiddleware, createWorkout);
router.delete("/:id", authMiddleware, deleteWorkout);
router.patch("/:id", authMiddleware, updateWorkout);

module.exports = router;
