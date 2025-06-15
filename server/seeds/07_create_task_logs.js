const tableName = "task_logs";
 
const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([{ 
    user_id: 2,
    task_id: 2,
    object_type: "pump",
    object_id: 2,
    comment: "checked pump",
    action: "completed",
    task_date: new Date("2025-04-17T03:24:00")
  },
  ]);
};
 
export { seed };