import db from "./database/connection";
import express from "express";

const routes = express.Router();

let insertedUsersIds: number[] = [];

routes.post("/users", async (request, response) => {
  const {
    name,
    picture,
    cpf,
    phone,
    login,
    password,
    email,
    cep,
  } = request.body;

  const trx = await db.transaction();

  try {
    const insertedDistrictIds = await trx("district").insert({
      cep,
    });

    const district_id = insertedDistrictIds[0];

    insertedUsersIds = await trx("users").insert({
      name,
      picture,
      cpf,
      phone,
      login,
      password,
      email,
      district_id,
    });

    await trx.commit();

    return response.status(201).send();
  } catch (err) {
    await trx.rollback();

    return response.status(400).json({
      error: "Erro inesperado ao criar um usuário",
    });
  }
});

routes.post("/waste", async (request, response) => {
  const { name, picture, description, type, quantity } = request.body;

  const trx = await db.transaction();

  const insertedTypesIds = await trx("types").insert({
    name: type,
  });

  const insertedAmountsIds = await trx("amounts").insert({
    quantity,
  });

  const types_id = insertedTypesIds[0];
  const amounts_id = insertedAmountsIds[0];

  const insertedWasteIds = await trx("waste").insert({
    name,
    picture,
    description,
    types_id,
    amounts_id,
  });

  const users_id = insertedUsersIds[0];
  const waste_id = insertedWasteIds[0];

  await trx("users_waste").insert({
    users_id,
    waste_id,
  });

  await trx.commit();

  return response.send();
});

routes.post("/companies", async (request, response) => {
  const { name, picture, cnpj, description, phone, email, cep } = request.body;

  const trx = await db.transaction();

  const insertedDistrictIds = await trx("district").insert({
    cep,
  });

  const district_id = insertedDistrictIds[0];

  await trx("companies").insert({
    name,
    picture,
    cnpj,
    description,
    phone,
    email,
    district_id,
  });

  await trx.commit();

  return response.send();
});

export default routes;
