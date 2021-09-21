import UsersController from "./controllers/UsersController";
import express from "express";

const routes = express.Router();
const usersController = new UsersController();

routes.post("/users", usersController.create);

routes.post("/waste");

// routes.post("/companies", async (request, response) => {
//   const { name, picture, cnpj, description, phone, email, cep } = request.body;

//   const trx = await db.transaction();

//   try {
//     const insertedDistrictIds = await trx("district").insert({
//       cep,
//     });

//     const district_id = insertedDistrictIds[0];

//     await trx("companies").insert({
//       name,
//       picture,
//       cnpj,
//       description,
//       phone,
//       email,
//       district_id,
//     });

//     await trx.commit();

//     return response.status(201).send();
//   } catch (err) {
//     await trx.rollback();

//     return response.status(400).json({
//       error: "Erro inesperado ao adicionar a empresa ou local",
//     });
//   }
// });

export default routes;
