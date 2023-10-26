import {Router} from "express";
import {Container} from "typedi";
import config from "../../../config";
import {celebrate, Joi} from "celebrate";
import IElevatorController from "../../controllers/IControllers/IElevatorController";

const route=Router();
export default (app: Router) => {
  app.use("/elevator",route);
  const ctrl=Container.get(config.controllers.elevator.name) as IElevatorController;
  route.post(
    "/create",
    celebrate({
      body: Joi.object({
        designation: Joi.string().required(),
        buildingDesignation: Joi.string().required(),
        floorsServed: Joi.array().required()
      })
    }),
    (req,res,next) => ctrl.createElevator(req,res,next)
  );
}
