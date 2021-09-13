import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("waste", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("picture").notNullable();
    table.string("description").notNullable();

    table
      .integer("types_id")
      .notNullable()
      .references("id")
      .inTable("types")
      .onUpdate("CASCADE");

    table
      .integer("amounts_id")
      .notNullable()
      .references("id")
      .inTable("amounts")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("waste");
}
