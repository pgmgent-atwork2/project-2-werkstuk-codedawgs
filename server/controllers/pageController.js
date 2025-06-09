import knex from "../lib/Knex.js";

export const home = async (req, res) => {
  const departments = await knex("departments").select("*");
  const tasks = await knex("tasks").select("*");

  res.render("pages/home", {
    title: "Home",
    user: req.user,
    departments: departments,
    tasks,
  });
};

export const admin = async (req, res) => {
  const taskLogs = await knex("task_logs").select("*");
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
  });
};

export const userPage = async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.render("pages/users", {
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
    const tasks = await knex("tasks").select("*");
    const departments = await knex("departments").select("*");
    const sub_departments = await knex("sub_departments").select("*");
    const filters = await knex("filters").select("*");
    const pumps = await knex("pumps").select("*");

    res.render("pages/taskpage", {
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
