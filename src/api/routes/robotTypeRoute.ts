import { Router } from "express";
import Container from "typedi";
import config from "../../../config";
import IRobotTypeController from "../../controllers/IControllers/IRobotTypeController";
import { Joi, celebrate } from "celebrate";

const route = Router();

export default(app: Router) =>{
    app.use('/robotTypes', route);

    const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                taskTypes: Joi.array().items(
                  Joi.string().required()
                  ).required(),
                robotTypeModel: Joi.string().required(),
                brand: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.createRobotType(req, res, next)
    );
};
