import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("amounts", (table) => {
    table.increments("id").primary();
    table.decimal("quantity").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("amounts");
}
