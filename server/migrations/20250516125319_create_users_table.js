const tableName = "users";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary().unique();
    table.string("first_name");
    table.string("last_name");
    table.integer("image_id");
    table.string("token").notNullable();
    table.string("pincode");
    table.string('role').notNullable()
      .checkIn(['admin', 'user', 'aqua']);
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}