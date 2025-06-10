import knex from "../lib/Knex.js";

export const postNotification = async (req, res) => {
  const { measurement_log_id, measurement_def_id, message } = req.body;
  
  try {
    await knex("notifications").insert({
      measurement_log_id,
      measurement_def_id,
      message,
    });
    res.redirect("/general/analysis");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while trying to add a notification.");
  }
};

export const getNotifications = async (req, res) => {
  try {
    const count = await knex("notifications")
      .count("id as count")
      .first();
    res.json({ hasNew: count.count > 0 });
  } catch (error) {
    console.error("Notification check error:", error);
    res.status(500).json({ hasNew: false });
  }
};