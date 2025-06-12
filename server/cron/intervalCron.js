import cron from "node-cron";
import knex from "../lib/Knex.js";

cron.schedule("0 0 * * *", async () => {
  try {
    await knex("tasks").where("interval", "daily").update({ completed: false });
    console.log("All daily tasks set to completed: false (every day at midnight)");
  } catch (err) {
    console.error("Error resetting daily tasks:", err);
  }
});

cron.schedule("0 0 * * 1", async () => {
  try {
    await knex("tasks").where("interval", "weekly").update({ completed: false });
    console.log("All weekly tasks set to completed: false (every Monday at midnight)");
  } catch (err) {
    console.error("Error resetting weekly tasks:", err);
  }
});

cron.schedule("0 0 1 * *", async () => {
  try {
    await knex("tasks").where("interval", "monthly").update({ completed: false });
    console.log("All monthly tasks set to completed: false (on the 1st of each month at midnight)");
  } catch (err) {
    console.error("Error resetting monthly tasks:", err);
  }
});