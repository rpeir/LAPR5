import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IFloorController from "../../controllers/IControllers/IFloorController";
import { celebrate, Joi } from "celebrate";

const route = Router();

export default (app: Router) => {
  app.use("/floor", route);
  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post(
    "/create",
    celebrate({
      body: Joi.object({
        floorNr: Joi.number().required(),
        building: Joi.string().required(),
        description: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createFloor(req, res, next)
  );
}
