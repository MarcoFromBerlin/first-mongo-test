const express = require("express");
const router = express.Router();

// @route   GET api/todolist
// @desc    add a task
// @access  Public
router.get("/", (req, res) => {
  res.send("GET TASKS");
});

module.exports = router;
