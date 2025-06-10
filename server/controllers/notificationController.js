import knex from "../lib/Knex.js";

export const postNotification = async (req, res) => {
  const { test } = req.body;
  console.log(test);
  
//   try {
//     await knex("users").insert({
//       first_name,
//       last_name,
//       token,
//       role,
//     });
//     res.redirect("/admin/users");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error while trying to add a user.");
//   }
};
