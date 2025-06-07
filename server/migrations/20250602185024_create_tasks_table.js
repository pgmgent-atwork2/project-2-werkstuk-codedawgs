const tableName = "tasks";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary().unique();
    table.string("title");
    table.boolean("visible").notNullable();
    table.boolean("completed").notNullable();
    table
      .string("interval")
      .notNullable()
      .checkIn(['daily', 'weekly', 'monthly', "none"]);
    table
      .string("object_type")
      .notNullable()
      .checkIn(["department", "sub_department", "filter", "pump"]);
    table.integer("object_id").unsigned();
  });
}
export function down(knex) {
  return knex.schema.dropTable(tableName);
}
