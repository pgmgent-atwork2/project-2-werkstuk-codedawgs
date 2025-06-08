import knex from "../lib/Knex.js";

export const home = async (req, res) => {
  const departments = await knex("departments").select("*");
  const tasks = await knex("tasks").select("*");

  res.render("pages/home", {
    title: "Home",
    user: req.user,
    userRole: req.user.role,
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
    userRole: req.user.role,
    taskLogs,
    tasks,
    users,
    departments,
    sub_departments,
    filters,
    pumps
  });
};

export const userPage = async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.render("pages/users", {
      users,
      user: req.user,
      userRole: req.user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Fout bij laden van gebruikers.");
  }
};

export const taskPageAdmin = async (req, res) => {
  let { departmentString } = req.params;

  const intervalString = req.path.split('/')[1]; 
  try {
    const tasks = await knex("tasks").select("*");
    const departments = await knex("departments").select("*");
    const sub_departments = await knex("sub_departments").select("*");
    const filters = await knex("filters").select("*");
    const pumps = await knex("pumps").select("*");
    
    res.render("pages/admin-tasks", {
      user: req.user,
      userRole: req.user.role,
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
}

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
      userRole: req.user.role,
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
  const { taskName } = req.params
  const tasks = await knex("tasks").select("*");
  const departments = await knex("departments").select("*");
  const sub_departments = await knex("sub_departments").select("*");
  const filters = await knex("filters").select("*");
  const pumps = await knex("pumps").select("*");

  try {
    
    res.render("pages/general-taskpage", {
      user: req.user,
      userRole: req.user.role,
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