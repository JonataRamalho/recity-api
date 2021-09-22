import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("waste", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("date").notNullable();
    table.string("picture").notNullable();
    table.decimal("quantity").notNullable();
    table.string("description").notNullable();

    table
      .integer("waste_types_id")
      .notNullable()
      .references("id")
      .inTable("waste_types")
      .onUpdate("CASCADE");

    table
      .integer("measurement_unit_id")
      .notNullable()
      .references("id")
      .inTable("measurement_unit")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("waste");
}
