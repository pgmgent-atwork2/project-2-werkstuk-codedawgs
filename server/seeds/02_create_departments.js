const tableName = "departments";
 
const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { title: "Dolphins" },
    { title: "Sea lions" },
    { title: "Seals" },
    { title: "Aquasplash" },
  ]);
};
 
export { seed };