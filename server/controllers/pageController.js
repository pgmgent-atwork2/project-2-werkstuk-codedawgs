import knex from "../lib/Knex.js";

export const home = async (req, res) => {
  const departments = await knex("departments").select("*");

  res.render("pages/home", {
    title: "Home",
    first_name: req.user.first_name,
    userRole: req.user.role,
    departments: departments,
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
    res.render("pages/users", {
      users,
      userRole: req.user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Fout bij laden van gebruikers.");
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
