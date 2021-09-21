import { Request, Response } from "express";

import db from "../database/connection";

let insertedUsersIds: number[] = [];

export default class UsersController {
  async create(request: Request, response: Response) {
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
  }
}
