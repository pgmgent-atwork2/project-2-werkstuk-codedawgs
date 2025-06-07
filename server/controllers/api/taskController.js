import Task from "../../models/Task.js";
import TaskLogs from "../../models/TaskLogs.js";

export const taskLogs = async (req, res, next) => {
  const taskLogs = await TaskLogs.query();
  res.json(taskLogs);
};

export const tasks = async (req, res, next) => {
  const tasks = await Task.query();
  res.json(tasks);
};