const tableName = "task_logs";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary().unique();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("task_id").unsigned().references("id").inTable("tasks");
    table
      .string("object_type")
      .notNullable()
      .checkIn(["department", "sub_department", "filter", "pump"]);
    table.integer("object_id").unsigned();
    table.string("comment");
    table.string("action");
    table.date("task_date");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
