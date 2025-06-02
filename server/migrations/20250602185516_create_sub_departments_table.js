const tableName = "sub_departments";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary().unique();
    table.string("title");
    table
      .integer("department_id")
      .unsigned()
      .references("id")
      .inTable("departments");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
