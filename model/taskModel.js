const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      unique: true,
    },
    task_name: { type: String, required: true },
    state: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("tasks", taskSchema);

module.exports = taskModel;
