import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IRobotController from "../../controllers/IControllers/IRobotController";
import { celebrate, Joi } from "celebrate";
import middlewares from "../middlewares";

const route = Router();
export default (app: Router) => {
  app.use("/robots", route);
  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  route.post(
    "",
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      body: Joi.object({
        nickName: Joi.string().required(),
        robotCode: Joi.string().required(),
        serialNr: Joi.string().required(),
        description: Joi.string().required(),
        robotType: Joi.string().required(),
        state: Joi.string()
      })
    }),
    (req, res, next) => ctrl.createRobot(req, res, next)
  );
  route.patch(
    "/disable-by-nick",
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      body: Joi.object({
        nickName: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.disableRobot(req, res, next)
  );
  route.patch(
    "/disable-by-code",
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      body: Joi.object({
        robotCode: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.disableRobot(req, res, next)
  );

  route.get(
    "",
    middlewares.isAuth,
    middlewares.verifyToken,
    (req, res, next) => ctrl.consultAllRobots(req, res, next),
  );

  route.get(
    "/task-type/:taskType",
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      params: Joi.object({
        taskType: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.consultRobotsByTaskType(req, res, next),
  );
  route.use(middlewares.validateBody);

  route.get(
    "/:robotType",
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      params: Joi.object({
        robotType: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.consultRobotsByRobotType(req, res, next),
  );
  route.use(middlewares.validateBody);
};
