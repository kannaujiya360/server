const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // UUID
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "IN_PROGRESS"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
