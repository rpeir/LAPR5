import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IFloorController from "../../controllers/IControllers/IFloorController";
import { celebrate, Joi } from "celebrate";

const route = Router();

export default (app: Router) => {
  app.use("/floors", route);
  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post(
    "/create",
    celebrate({
      body: Joi.object({
        floorNr: Joi.number().required(),
        building: Joi.string().required(),
        description: Joi.string().required(),
        floorMap: Joi.object()
      })
    }),
    (req, res, next) => ctrl.createFloor(req, res, next)
  );

  route.get("/building",
    (req, res, next) => ctrl.getFloorsOfBuilding(req, res, next)
  );

  route.get(
    "/building/max/min",
    (req, res, next) => ctrl.getBuildingFloorMaxMin(req, res, next)
  );

  route.put(
    "",
    celebrate({
      body: Joi.object({
        domainId: Joi.string().required(),
        floorNr: Joi.number().required(),
        description: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.updateBuildingFloor(req, res, next)
  );

  route.patch(
    "/upload",
    // check if i can do this with building nr and floor nr
    celebrate({
      body: Joi.object({
        floorNr: Joi.number().required(),
        building: Joi.string().required(),
        description: Joi.string(),
        floorMap: Joi.object().required(),
      })
    }),
    (req, res, next) => ctrl.uploadFloorMap(req, res, next)
  )
  route.get(
    '/list',
    celebrate({
      query: Joi.object({
        buildingDesignation: Joi.string().required(),
      })
    })
    , (req, res, next) => ctrl.listFloorsWithPathways(req, res, next)
  )
}
