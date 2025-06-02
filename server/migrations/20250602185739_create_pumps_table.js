const tableName = "pumps";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary().unique();
    table.string("title");
    table
      .integer("sub_department_id")
      .unsigned()
      .references("id")
      .inTable("sub_departments");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
