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
    res.redirect("/admin/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while trying to add a user.");
  }
};
