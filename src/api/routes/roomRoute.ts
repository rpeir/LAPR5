import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import { celebrate, Joi } from "celebrate";
import IRoomController from "../../controllers/IControllers/IRoomController";
import middlewares from "../middlewares";

const route = Router();
export default (app: Router) => {
  app.use("/room", route);
  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  route.post(
    "/create",
    celebrate({
      body: Joi.object({
        name : Joi.string().required(),
        description : Joi.string().required(),
        category : Joi.string().required(),
        floor : Joi.number().required(),
        building : Joi.string().required()
      })
    }),
    (req,res,next) => ctrl.createRoom(req, res,next)
  );

  // Celebrate failure error handler middleware
  route.use(middlewares.validateBody);
}
