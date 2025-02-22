import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("users_waste", (table) => {
    table
      .integer("users_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .integer("waste_id")
      .notNullable()
      .references("id")
      .inTable("waste")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users_waste");
}
