import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import { celebrate, Joi } from "celebrate";
import middlewares from "../middlewares";
import ITaskController from "../../controllers/IControllers/ITaskController";

const route = Router();
export default (app: Router) => {
  app.use("/tasks", route);
  const ctrl = Container.get(config.controllers.task.name) as ITaskController;

  route.get(
    "",
    middlewares.isAuth,
    middlewares.verifyToken,
    (req, res, next) => {
      ctrl.getAll(req, res, next);
    }
  );

  route.get("/pending",
    // middlewares.isAuth,
    // middlewares.verifyToken,
    (req, res, next) => {
      ctrl.getPendingTasks(req, res, next);
    });

  // get by id
  route.get(
    "/:id",
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      })
    }),
    (req, res, next) => {
      ctrl.getById(req, res, next);
    }
  );

  // approve task
  route.post(
    "",
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      body: Joi.object({
        taskRequestId: Joi.string().required(),
        robotId: Joi.string().required()
      })
    }),
    (req, res, next) => {
      ctrl.approveTask(req, res, next);
    }
  );

  route.use(middlewares.validateBody);
};
