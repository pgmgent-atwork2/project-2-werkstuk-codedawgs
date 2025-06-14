import { v4 as uuidv4 } from "uuid";
import knex from "../lib/Knex.js";

export const postUser = async (req, res) => {
  const { first_name, last_name, role } = req.body;
  const token = uuidv4().slice(0, 13).replace("-", "");
  try {
    await knex("users").insert({
      first_name,
      last_name,
      token,
      role,
    });
  res.cookie('toast', `Successfully added ${first_name} (${role})`, { httpOnly: false, maxAge: 10 * 1000 });
  res.redirect(`/admin/users`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while trying to add a user.");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, role } = req.body;
  
  try {
    await knex("users").where("id", id).del();
    res.cookie('toast', `Successfully deleted ${first_name} (${role})`, { httpOnly: false, maxAge: 10 * 1000 });
    res.redirect(`/admin/users`);
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).send("Failed to delete user");
  }
};