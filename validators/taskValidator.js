const { z } = require("zod");

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "COMPLETED", "IN_PROGRESS"]),
});

module.exports = taskSchema;
