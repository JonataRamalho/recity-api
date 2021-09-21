import { Request, Response } from "express";

import db from "../database/connection";

export default class WasteController {
  async create(request: Request, response: Response) {
    const {
      name,
      picture,
      cnpj,
      description,
      phone,
      email,
      cep,
    } = request.body;

    const trx = await db.transaction();

    try {
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

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: "Erro inesperado ao adicionar a empresa ou local",
      });
    }
  }
}
