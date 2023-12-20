import {NextFunction, Request, Response, Router} from "express";
import {celebrate, Joi} from "celebrate";
import {Container} from "typedi";
import config from "../../../config";
import IUserRequestController from "../../controllers/IControllers/IUserRequestController";
import AuthService from "../../services/userService";
import {IUserDTO} from "../../dto/IUserDTO";
import winston from "winston";
import middlewares from "../middlewares";

const route=Router();

export default (app:Router)=>{
  app.use('/userRequests',route);
  const ctrl=Container.get(config.controllers.userRequest.name) as IUserRequestController;
  route.get(
    '/listAllRequests',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      query: {},
    }),
    (req, res, next) => {
      ctrl.listAllRequests(req, res, next);
    },
  );

  route.post(
    '/register-user',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => {
      ctrl.registerUser(req, res, next);
    },
  );

  route.delete(
    '/decline-user/:id',
    middlewares.isAuth,
    middlewares.verifyToken,
    celebrate({
      params:{
        id:Joi.string().required(),
      }
      }),
    (req,res,next)=>{
      ctrl.declineUser(req,res,next);
    },
  );
}
