import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import { celebrate, Joi } from 'celebrate';
import IElevatorController from '../../controllers/IControllers/IElevatorController';
import middlewares from '../middlewares';

const route = Router();
export default (app: Router) => {
  app.use('/elevators', route);
  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;
  route.post(
    '',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      body: Joi.object({
        designation: Joi.string().required(),
        buildingDesignation: Joi.string().required(),
        floorsServed: Joi.array().required(),
        brand: Joi.string(),
        modelE: Joi.string(),
        serialNumber: Joi.string(),
        description: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.createElevator(req, res, next),
  );
  route.get(
    '',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      query: {
        buildingDesignation: Joi.string().required(),
      },
    }),
    (req, res, next) => {
      ctrl.listElevator(req, res, next);
    },
  );

  route.put(
    '',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        designation: Joi.string().required(),
        buildingDesignation: Joi.string().required(),
        floorsServed: Joi.array().required(),
        brand: Joi.string().required(),
        modelE: Joi.string().required(),
        serialNumber: Joi.string().required(),
        description: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.replaceElevator(req, res, next),
  );
  route.patch(
    '',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      body: Joi.object({
        id: Joi.string(),
        designation: Joi.string(),
        buildingDesignation: Joi.string(),
        floorsServed: Joi.array(),
        brand: Joi.string().allow(''),
        modelE: Joi.string().allow(''),
        serialNumber: Joi.string().allow(''),
        description: Joi.string().allow(''),
      }),
    }),
    (req, res, next) => ctrl.updateElevator(req, res, next),
  );
  route.use(middlewares.validateBody);
};
