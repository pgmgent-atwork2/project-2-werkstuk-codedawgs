import cron from "node-cron";
import knex from "../lib/Knex.js";
import { DateTime } from "luxon";

export const home = async (req, res) => {
  const departments = await knex("departments").select("*");
  const sub_departments = await knex("sub_departments").select("*");
  const tasks = await knex("tasks").select("*");
  const countObj = await knex("notifications").count("id as count").first();
  const notificationCount = Number(countObj.count) || 0;
  const filters = await knex("filters").select("*");
  const pumps = await knex("pumps").select("*");

  res.render("pages/home", {
    title: "Home",
    user: req.user,
    departments,
    sub_departments,
    pumps,
    filters,
    tasks,
    notificationCount
  });
};

export const admin = async (req, res) => {
  const { startMonth, startYear, endMonth, endYear, userId, objectType } = req.query;
  let taskLogsQuery = knex("task_logs").select("*");

  if (startMonth && startYear && endMonth && endYear) {
    const startDate = new Date(`${startYear}-${startMonth.padStart(2, '0')}-01T00:00:00Z`);
    const endDate = new Date(`${endYear}-${endMonth.padStart(2, '0')}-01T00:00:00Z`);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    endDate.setHours(23, 59, 59, 999);

    taskLogsQuery = taskLogsQuery
      .whereBetween("task_date", [startDate.getTime(), endDate.getTime()]);
  }

  if (userId && userId !== "") {
    taskLogsQuery = taskLogsQuery.where("user_id", Number(userId));
  }

  if (objectType && objectType !== "") {
    taskLogsQuery = taskLogsQuery.where("object_type", objectType);
  }

  const allObjectTypesRows = await knex("tasks").distinct("object_type as type");
  const allObjectTypes = allObjectTypesRows.map(row => row.type).filter(Boolean);

  const taskLogs = await taskLogsQuery;
  const tasks = await knex("tasks").select("*");
  const users = await knex("users").select("*");
  const departments = await knex("departments").select("*");
  const sub_departments = await knex("sub_departments").select("*");
  const filters = await knex("filters").select("*");
  const pumps = await knex("pumps").select("*");

  res.render("./pages/admin", {
    title: "Admin",
    user: req.user,
    taskLogs,
    tasks,
    users,
    departments,
    sub_departments,
    filters,
    pumps,
    userId,
    startMonth,
    startYear,
    endMonth,
    endYear,
    objectType,
    allObjectTypes
  });
};

export const userPage = async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.render("pages/users", {
      title: "Users | Admin",
      users,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Fout bij laden van gebruikers.");
  }
};

export const taskPageAdmin = async (req, res) => {
  let { departmentString } = req.params;

  const intervalString = req.path.split("/")[1];
  try {
    const tasks = await knex("tasks").select("*");
    const departments = await knex("departments").select("*");
    const sub_departments = await knex("sub_departments").select("*");
    const filters = await knex("filters").select("*");
    const pumps = await knex("pumps").select("*");

    res.render("pages/admin-tasks", {
      title: "Tasks",
      user: req.user,
      tasks,
      intervalString,
      departmentString,
      departments,
      sub_departments,
      filters,
      pumps,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading tasks");
  }
};

export const taskPage = async (req, res) => {  
  const { departmentString } = req.params;
  const intervalString = req.path.split("/")[1];

  try {
    const tasks = await knex("tasks").select("*").where("interval", intervalString);
    
    const departments = await knex("departments").select("*");
    const sub_departments = await knex("sub_departments").select("*");
    const filters = await knex("filters").select("*");
    const pumps = await knex("pumps").select("*");
    
    res.render("pages/taskpage", {
      title: "Tasks",
      user: req.user,
      tasks,
      intervalString,
      departmentString,
      departments,
      sub_departments,
      filters,
      pumps,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading tasks");
  }
};

export const generalTaskPage = async (req, res) => {
  const { taskName } = req.params;  
  const tasks = await knex("tasks").select("*");
  const departments = await knex("departments").select("*");
  const sub_departments = await knex("sub_departments").select("*");
  const filters = await knex("filters").select("*");
  const pumps = await knex("pumps").select("*");

  try {
    res.render("pages/general-taskpage", {
      title: "General Tasks",
      user: req.user,
      taskName,
      tasks,
      departments,
      sub_departments,
      filters,
      pumps,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading tasks");
  }
};

export const analysisPage = async (req, res) => {
  const departments = await knex("departments").select("*");
  const sub_departments = await knex("sub_departments").select("*");
  const measurement_definitions = await knex("measurement_definitions").select("*");
  const measurement_logs = await knex("measurement_logs").select("*");
  const users = await knex("users").select("*");

  try {
    
    res.render("pages/analysispage", { 
      title: "Water Analysis",
      user: req.user,
      departments,
      sub_departments,
      measurement_definitions,
      measurement_logs,
      users,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading tasks");
  }
};

export const waterAnalysisPage = async (req, res) => {
  const departments = await knex("departments").select("*");
  const sub_departments = await knex("sub_departments").select("*");
  const filters = await knex("filters").select("*");
  const pumps = await knex("pumps").select("*");
  const measurements = await knex("measurement_definitions").select("*");

  try {
    res.render("pages/analysis", {
      title: "Analysis",
      user: req.user,
      departments,
      sub_departments,
      filters,
      pumps,
      measurements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading water analysis page");
  }
};

export const completeTask = async (req, res) => {
  const { id } = req.params;
  const completed = req.body.completed === "true";
  const task_date = DateTime.now().setZone("Europe/Brussels").toMillis();

  try {
    const task = await knex("tasks").where("id", id).first();

    if (!task) {
      return res.status(404).send("Task not found");
    }

    await knex("task_logs").insert({
      task_id: id,
      user_id: req.user.id,
      object_type: task.object_type,
      object_id: task.object_id,
      comment: "",
      action: completed ? "completed" : "uncompleted",
      task_date,
    });

    res.status(200).send("Task updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating task");
  }
};

export const calendar = async (req, res) => {
  const departments = await knex("departments").select("*");
  const tasks = await knex("tasks").select("*");
  const countObj = await knex("notifications").count("id as count").first();
  const notificationCount = Number(countObj.count) || 0;

  res.render("pages/calendar", {
    title: "Calendar",
    user: req.user,
  });
};