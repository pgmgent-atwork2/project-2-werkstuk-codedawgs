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
      comment: req.body.comment,
      action: completed ? "completed" : "uncompleted",
      task_date,
    });

    res.redirect(req.get("referer"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Edit task failed");
  }
};

export const addTask = async (req, res) => {
const { title, object_type, object_id, interval } = req.body;
  try {
    await knex("tasks").insert({
      title,
      object_type,
      object_id,
      interval,
      completed: false,
      visible: true
    });

    res.redirect('/admin/tasks');
  } catch (error) {
    console.error("Add task error:", error);
    res.status(500).send("Failed to add task");
  }
};

export const getObjectOptions = async (req, res) => {
  const { type } = req.query;
  let table = "";
  switch (type) {
    case "department":
      table = "departments";
      break;
    case "sub_department":
      table = "sub_departments";
      break;
    case "pump":
      table = "pumps";
      break;
    case "filter":
      table = "filters";
      break;
    default:
      return res.json([]);
  }
  try {
    const rows = await knex(table).select("id", "title");
    res.json(rows);
  } catch (error) {
    console.error("Get object options error:", error);
    res.status(500).json([]);
  }
};

export const editTask = async (req, res) => {
  const { title, object_type, department, interval } = req.body;
  const id = req.params.id;

  try {
    await knex("tasks")
      .where({ id })
      .update({
        title,
        object_type,
        interval,
      });

    res.redirect(req.get("referer"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Edit task failed");
  }
}

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

export const postAnalysis = async (req, res) => {
  const date = Date.now(); 
  try {
    const [id] = await knex("measurement_logs").insert({
      user_id: req.user.id-1,
      sub_department_id: req.body.sub_department,
      measured_date: date,
      time: req.body.time,
      comment: req.body.comment,
      measurements: JSON.stringify({
        temp: req.body[1],
        d_f_cl: req.body[2],
        d_ph: req.body[3],
        f_cl: req.body[4],
        tot_cl: req.body[5],
        comb_cl: req.body[6],
        ph: req.body[7],
        salt: req.body[8],
        tot_col: req.body[9],
        e_coli: req.body[10],
      }),
    }, ["id"]);

    res.json({ id })
    // res.redirect(req.get("referer"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Post task failed");
  }
};