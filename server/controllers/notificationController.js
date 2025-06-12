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
    const notifications = await knex("notifications").select("*").orderBy("id", "desc");
    const measurement_definitions = await knex("measurement_definitions").select("*");
    const measurement_logs = await knex("measurement_logs").select("*");
    const sub_departments = await knex("sub_departments").select("*");

    res.render("pages/notifications", {
      title: "Notifications",
      user: req.user,
      notifications,
      measurement_definitions,
      measurement_logs,
      sub_departments,
    });
  } catch (error) {
    console.error("Get all notifications error:", error);
    res.status(500).render("pages/notifications", {
      user: req.user,
      notifications: []
    });
  }
};

export const resolveNotification = async (req, res) => {
  const { id } = req.params;

  try {
    await knex("notifications").where({ id }).del();
    res.redirect("/notifications/all");
  } catch (error) {
    console.error("Resolve notification error:", error);
    res.status(500).send("Error while trying to resolve the notification.");
  }
};