import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IBuildingController from '../../controllers/IControllers/IBuildingController';
import { celebrate, Joi } from 'celebrate';

const route = Router();
export default (app: Router) => {
  app.use('/building', route);
  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        code: Joi.string().required(),
        designation: Joi.string().required(),
        description: Joi.string().required(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        height: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next),
  );
  //EDIT BUILDING
  route.patch(
    '/update',
    celebrate({
      body: Joi.object({
        code: Joi.string().required(),
        designation: Joi.string(),
        description: Joi.string(),
        length: Joi.number(),
        width: Joi.number(),
        height: Joi.number(),
      }),
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next),
  );
};
