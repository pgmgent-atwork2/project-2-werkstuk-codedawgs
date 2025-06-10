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
    const countObj = await knex("notifications")
      .count("id as count")
      .first();
    const count = Number(countObj.count) || 0;
    res.json({ hasNew: count > 0, count });
  } catch (error) {
    console.error("Notification check error:", error);
    res.status(500).json({ hasNew: false, count: 0 });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await knex("notifications")
      .orderBy("id", "desc")
      .select("*");
    res.render("pages/notifications", {
      user: req.user,
      notifications
    });
  } catch (error) {
    console.error("Get all notifications error:", error);
    res.status(500).render("pages/notifications", {
      user: req.user,
      notifications: []
    });
  }
};