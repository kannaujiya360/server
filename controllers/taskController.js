const Task = require("../models/Task");
const { v4: uuidv4 } = require("uuid");
const taskSchema = require("../validators/taskValidator");


exports.createTask = async (req, res) => {
  try {
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const newTask = new Task({
      id: uuidv4(),
      ...parsed.data,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const { status, search } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (search) filter.title = { $regex: new RegExp(search, "i") };

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const parsed = taskSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { id: req.params.id },
      { ...parsed.data, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
