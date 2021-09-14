import db from "./database/connection";
import express from "express";

const routes = express.Router();

let insertedUsersIds = [1];

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

  const insertedDistrictIds = await db("district").insert({
    cep,
  });

  const district_id = insertedDistrictIds[0];

  insertedUsersIds = await db("users").insert({
    name,
    picture,
    cpf,
    phone,
    login,
    password,
    email,
    district_id,
  });

  return response.send();
});

routes.post("/waste", async (request, response) => {
  const { name, picture, description, type, quantity } = request.body;

  const insertedTypesIds = await db("types").insert({
    name: type,
  });

  const insertedAmountsIds = await db("amounts").insert({
    quantity,
  });

  const types_id = insertedTypesIds[0];
  const amounts_id = insertedAmountsIds[0];

  const insertedWasteIds = await db("waste").insert({
    name,
    picture,
    description,
    types_id,
    amounts_id,
  });

  const users_id = insertedUsersIds[0];
  const waste_id = insertedWasteIds[0];

  await db("users_waste").insert({
    users_id,
    waste_id,
  });

  return response.send();
});

routes.post("/companies", async (request, response) => {
  const { name, picture, cnpj, description, phone, email, cep } = request.body;

  const insertedDistrictIds = await db("district").insert({
    cep,
  });

  const district_id = insertedDistrictIds[0];

  await db("companies").insert({
    name,
    picture,
    cnpj,
    description,
    phone,
    email,
    district_id,
  });

  return response.send();
});

export default routes;
