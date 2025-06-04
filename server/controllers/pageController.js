import knex from "../lib/Knex.js";

export const home = async (req, res) => {
  res.render("pages/home", {
    title: "Home",
    first_name: req.user.first_name,
    admin: req.user.admin,
  });
};

export const admin = async (req, res) => {
  res.render("./pages/admin", {
    title: "Admin",
  });
};

export const userPage = async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.render("pages/users", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while loading the users.");
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
