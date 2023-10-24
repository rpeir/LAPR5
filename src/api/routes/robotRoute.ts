import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IRobotController from "../../controllers/IControllers/IRobotController";
import { celebrate, Joi } from "celebrate";

const route = Router();
export default (app: Router) => {
  app.use("/robot", route);
  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  route.post(
    "/create",
    celebrate({
      body: Joi.object({
        nickName: Joi.string().required(),
        nrSerie: Joi.string().required(),
        descricao: Joi.string().required(),
        tipoRobot: Joi.string().required()
      })
    }),
    (req,res,next) => ctrl.createRobot(req, res,next)
  );
}
