import CompaniesController from "./controllers/CompaniesController";
import UsersController from "./controllers/UsersController";
import WasteController from "./controllers/WasteController";
import express from "express";

const routes = express.Router();

const usersController = new UsersController();
const companiesController = new CompaniesController();
const wasteController = new WasteController();

routes.post("/users", usersController.create);

routes.post("/waste", wasteController.create);

routes.post("/companies", companiesController.create);

export default routes;
