import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("measurement_unit", (table) => {
    table.increments("id").primary();
    table.string("measure").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("measurement_unit");
}
