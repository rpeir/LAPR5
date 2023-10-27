import { Router } from "express";
import IPathwayController from "../../controllers/IControllers/IPathwayController";
import config from "../../../config";
import { Container } from "typedi";
import { celebrate, Joi } from "celebrate";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/pathways", route);
  const ctrl = Container.get(config.controllers.pathway.name) as IPathwayController;

  route.post(
    "",
    celebrate({
      body: Joi.object({
        buildingSource: Joi.string().required(),
        buildingDestination: Joi.string().required(),
        floorSource: Joi.number().required(),
        floorDestination: Joi.number().required(),
        description: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createPathway(req, res, next)
  );

  route.get('/list',
    celebrate({
      body: Joi.object({
        buildingSource: Joi.string().required(),
        buildingDestination: Joi.string().required()
      })
      }),
    (req, res, next) => ctrl.listPathways(req, res, next)
  );

  // Celebrate failure error handler middleware
  route.use(middlewares.validateBody);
}
