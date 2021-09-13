import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("district", (table) => {
    table.increments("id").primary();
    table.string("cep").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("district");
}
