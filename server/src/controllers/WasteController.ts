import { Request, Response } from "express";

import db from "../database/connection";

export default class WasteController {
  async create(request: Request, response: Response) {
    const { name, picture, description, type, quantity } = request.body;

    const trx = await db.transaction();

    try {
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

      // const users_id = insertedUsersIds[0]; Analisar essa parte
      const waste_id = insertedWasteIds[0];

      await trx("users_waste").insert({
        users_id,
        waste_id,
      });

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      // console.log(err);

      return response.status(400).json({
        error: "Erro inesperado ao adicionar o resíduo",
      });
    }
  }
}
