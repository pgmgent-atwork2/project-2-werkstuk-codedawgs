import knex from "../lib/Knex.js";

export const taskComplete = async (req, res) => {
  const { id } = req.params;
  const completed = req.body.completed ? true : false;
  const task_date = Date.now();

  const task = await knex("tasks").where("id", id).first();

  try {
    await knex("tasks").where("id", id).update({ completed });

    await knex("task_logs").insert({
      task_id: id,
      user_id: req.user.id,
      object_type: task.object_type,
      object_id: task.object_id,
      comment: "",
      action: completed ? "completed" : "uncompleted",
      task_date,
    });

    res.redirect(req.get("referer"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Edit task failed");
  }
};

export const editMeasurement = async (req, res) => {
  const { id } = req.params;
  const min_value = parseFloat(req.body.min_value);
  const max_value = parseFloat(req.body.max_value);

  try {
    await knex("measurement_definitions").where({ id }).update({
      min_value,
      max_value,
    });

    res.redirect("/admin/analysis");
  } catch (error) {
    console.error("Edit measurement error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update measurement" });
  }
};
