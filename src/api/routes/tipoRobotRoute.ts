import { Router } from "express";
import Container from "typedi";
import config from "../../../config";
import ITipoRobotController from "../../controllers/IControllers/ITipoRobotController";
import { Joi, celebrate } from "celebrate";

const route = Router();

export default(app: Router) =>{
    app.use('/tipoRobot', route);

    const ctrl = Container.get(config.controllers.tipoRobot.name) as ITipoRobotController;

    route.post(
        '/create',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                tipoTarefas: Joi.array().items(
                  Joi.string().required()
                  ).required(),
                modelo: Joi.string().required(),
                marca: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.createTipoRobot(req, res, next)
    );
};
