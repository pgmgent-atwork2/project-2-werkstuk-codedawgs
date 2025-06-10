const tableName = "notifications";
 
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary().unique();
        table.integer("measurement_log_id").unsigned().references("id").inTable("measurement_logs");
        table.integer("measurement_def_id").unsigned().references("id").inTable("measurement_definitions");
        table.string("message");
    });
}
 
export function down(knex) {
    return knex.schema.dropTable(tableName);
}