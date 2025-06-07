import Task from "../../models/Task.js";

export const tasks = async (req, res, next) => {
  const tasks = await Task.query();
  res.json(tasks);
};