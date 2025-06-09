const tableName = "measurement_definitions";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary().unique();
    table.string("name").notNullable();
    table.string("short").notNullable();
    table.string("unit");
    table.decimal("min_value", 6, 2);
    table.decimal("max_value", 6, 2);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
