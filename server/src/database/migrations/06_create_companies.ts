import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("companies", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("picture").notNullable();
    table.string("cnpj").notNullable();
    table.string("description").notNullable();
    table.string("phone").notNullable();
    table.string("email").notNullable();

    table
      .integer("district_id")
      .notNullable()
      .references("id")
      .inTable("district")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("companies");
}
