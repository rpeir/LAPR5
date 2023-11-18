import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IPlanningController from "../../controllers/IControllers/IPlanningController";

const route = Router();
export default (app: Router) => {
  app.use("/planning", route);
  const ctrl =  Container.get(config.controllers.planning.name) as IPlanningController;

  route.get("/floors",(req, res, next) => ctrl.getFloors(req,res, next));

  route.get("/elevators",(req, res, next) => ctrl.getElevators(req,res, next));

  route.get("/pathways",(req, res, next) => ctrl.getPathways(req,res, next));

  route.get("/path/lessBuildings",(req, res, next) => ctrl.getPath(req,res, next));
}
