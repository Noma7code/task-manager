const taskModel = require("../model/taskModel");
const errorHandler = require("../utils/errorHandler");

//create new task
async function createTask(req, res) {
  const { task_name, state } = req.body;
  if (!task_name) {
    return errorHandler(res, "Task name is required", 400);
  }
  try {
    const existingTask = await taskModel.findOne({
      task_name,
      user_id: req.userId,
    });
    if (existingTask) {
      return errorHandler(res, "Task already exists", 400);
    }

    const task = await taskModel.create({
      task_name,
      state: state || undefined,
      user_id: req.userId,
    });

    return res
      .status(201)
      .json({ success: true, message: "Task created successfully", task });
  } catch (error) {
    return errorHandler(res, error);
  }
}

//get all task
async function getAllTask(req, res) {
  const { state } = req.query;
  try {
    const filter = { user_id: req.userId };

    if (state === "pending" || state === "completed") {
      filter.state = state;
    }

    const tasks = await taskModel.find(filter);

    return res.status(200).json({
      success: true,
      message: tasks.length ? "Tasks fetched successfully" : "No tasks found",
      tasks,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
}
// update task
async function updateTask(req, res) {
  const { task_name, state } = req.body;
  const { taskId } = req.params;
  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id: taskId, user_id: req.userId },
      { task_name, state },
      { new: true }
    );

    if (!updatedTask) {
      return errorHandler(res, "Task not found or not authorized", 404);
    }
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
}

// delete task
async function deleteTask(req, res) {
  const { taskId } = req.params;
  try {
    const deletedTask = await taskModel.findOneAndDelete({
      _id: taskId,
      user_id: req.userId,
    });

    if (!deletedTask) {
      return errorHandler(res, "Task not found or not authorized", 404);
    }
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
}
async function updateTaskToDelete(req, res) {
  try {
    const { taskId } = req.params;

    const task = await taskModel.findOneAndUpdate(
      { _id: taskId, user_id: req.userId },
      { state: "deleted" },
      { new: true }
    );

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({ success: true, message: "Task moved to trash", task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
}
module.exports = {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
  updateTaskToDelete,
};
