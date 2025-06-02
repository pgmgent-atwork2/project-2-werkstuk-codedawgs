const tableName = "departments";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary().unique();
    table.string("title");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
