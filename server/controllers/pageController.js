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
