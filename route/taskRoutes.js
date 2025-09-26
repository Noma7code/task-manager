const express = require("express");
const {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
} = require("../controller/tasksController");
const { isAuth } = require("../middleware/authMiddleware");
const taskRouter = express.Router();

taskRouter.post("/create-task", isAuth, createTask);
taskRouter.get("/get-all-tasks", isAuth, getAllTask);
taskRouter.put("/update-task/:taskId", isAuth, updateTask);
taskRouter.delete("/delete-task/:taskId", isAuth, deleteTask);

module.exports = taskRouter;
