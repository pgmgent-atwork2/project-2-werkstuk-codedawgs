const tableName = "measurement_logs";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary().unique();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table
      .integer("sub_department_id")
      .unsigned()
      .references("id")
      .inTable("sub_departments");
    table.date("measured_date").notNullable();
    table.string("measurements");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
