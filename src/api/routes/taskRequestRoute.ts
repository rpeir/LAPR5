import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';
import ITaskController from '../../controllers/IControllers/ITaskController';

const route = Router();
export default (app: Router) => {
  app.use('/taskRequests', route);
  const ctrl = Container.get(config.controllers.task.name) as ITaskController;

  route.get(
    '',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      query: Joi.object({
        status: Joi.string(),
        robotType: Joi.string(),
        userId: Joi.string(),
        startTime: Joi.string(),
        endTime: Joi.string(),
      }),
    }),
    (req, res, next) => {
      ctrl.getTaskRequests(req, res, next);
    },
  );

  route.get(
    '/:id',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => {
      ctrl.getTaskRequestById(req, res, next);
    },
  );

  route.post(
    '',
    middlewares.isAuth,
    middlewares.verifyToken,
    (req, res, next) => {
      ctrl.createTaskRequest(req, res, next);
    },
  );

  route.delete(
    '/:id',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => {
      ctrl.rejectTask(req, res, next);
    },
  );

  route.use(middlewares.validateBody);
};
