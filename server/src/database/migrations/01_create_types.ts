import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("types", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("types");
}
