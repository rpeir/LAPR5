import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IRobotController from '../../controllers/IControllers/IRobotController';
import { celebrate, Joi } from 'celebrate';
import middlewares from "../middlewares";

const route = Router();
export default (app: Router) => {
  app.use('/robots', route);
  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        nickName: Joi.string().required(),
        robotCode: Joi.string().required(),
        serialNr: Joi.string().required(),
        description: Joi.string().required(),
        robotType: Joi.string().required(),
        state: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.createRobot(req, res, next),
  );
  route.patch(
    '/disable-by-nick',
    celebrate({
      body: Joi.object({
        nickName: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.disableRobot(req, res, next),
  );
  route.patch(
    '/disable-by-code',
    celebrate({
      body: Joi.object({
        robotCode: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.disableRobot(req, res, next),
  );
  route.get(
    "",
    (req, res, next) => ctrl.consultAllRobots(req, res, next),
  );
  route.use(middlewares.validateBody);
};
