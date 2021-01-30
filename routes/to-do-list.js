const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const Task = require("../models/Task");

// @route   GET api/todolist
// @desc    Get all tasks
// @access  Private

router.get("/", async (req, res) => {
  try {
    // perchè non c'è l'id ?

    const tasks = await Task.find({ todo: req.todo }).sort({ date: -1 });

    res.json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/todolist
// @desc    add a task
// @access  Private
router.post(
  "/",
  [
    check("task", "Task is required")
      .not()
      .isEmpty(),
    check("priority", "Give it a priority")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { task, priority } = req.body;

    try {
      const newTask = new Task({
        task,
        priority
      });

      const toDo = await newTask.save();

      res.json(toDo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/todolist/:id
// @desc    Update task
// @access  Private

router.put("/:id", async (req, res) => {
  const { task, priority } = req.body;

  const todoFields = {};
  if (task) todoFields.task = task;
  if (priority) todoFields.priority = priority;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: todoFields },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/todolist/:id
// @desc    Delete task
// @access  Private

router.delete("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: "Task deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
