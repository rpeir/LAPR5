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
        floorsServed: Joi.array().required(),
        brand: Joi.string(),
        modelE: Joi.string(),
        serialNumber: Joi.string(),
        description: Joi.string(),
      })
    }),
    (req,res,next) => ctrl.createElevator(req,res,next)
  );
  route.get(
      "/list",
      celebrate({
          body: Joi.object({
              buildingDesignation: Joi.string().required()
          })
      }),
      (req,res,next) => ctrl.listElevator(req,res,next)
  );
  route.put(
      "/edit",
      celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                code: Joi.string(),
                designation: Joi.string(),
                buildingDesignation: Joi.string(),
                floorsServed: Joi.array(),
                brand: Joi.string(),
                modelE: Joi.string(),
                serialNumber: Joi.string(),
                description: Joi.string(),
            })
        }),
        (req,res,next) => ctrl.updateElevator(req,res,next)
  );
}
