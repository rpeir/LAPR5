import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IFloorController from "../../controllers/IControllers/IFloorController";
import { celebrate, Joi } from "celebrate";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/floors", route);
  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post(
    "",
    middlewares.isAuth,
    middlewares.verifyToken,
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
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      query: Joi.object({
      building: Joi.string().required(),
    })
  }),
    (req, res, next) => ctrl.getFloorsOfBuilding(req, res, next)
  );

  route.get(
    "/building/max/min",
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      query: Joi.object({
        max: Joi.number().required(),
        min: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.getBuildingFloorMaxMin(req, res, next)
  );

  route.put(
    "",
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      body: Joi.object({
        domainId: Joi.string().required(),
        floorNr: Joi.number().required(),
        description: Joi.string().required(),
        building: Joi.string()
      })
    }),
    (req, res, next) => ctrl.updateBuildingFloor(req, res, next)
  );

  route.patch(
    "",
    middlewares.isAuth,
    middlewares.verifyToken,
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
    '/with-pathways',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      query: Joi.object({
        buildingDesignation: Joi.string().required(),
      })
    })
    , (req, res, next) => ctrl.listFloorsWithPathways(req, res, next)
  )

  route.get(
    '/:id',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.getFloorById(req, res, next)
  )
  route.use(middlewares.validateBody);
}

