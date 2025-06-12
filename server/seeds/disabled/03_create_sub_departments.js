const tableName = "sub_departments";

const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { title: "front pool", department_id: 1 },
    { title: "back pool", department_id: 1 },
    { title: "outside pool", department_id: 2 },
    { title: "inside pool", department_id: 2 },
    { title: "quarantaine", department_id: 2 },
    { title: "window", department_id: 3 },
    { title: "house", department_id: 3 },
    { title: "aquasplash", department_id: 4 },
  ]);
};

export { seed };
