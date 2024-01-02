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

  route.get("/path/lessBuildings",(req, res, next) => ctrl.getPathLessBuildings(req,res, next));

  route.get("/path/lessElevators",(req, res, next) => ctrl.getPathLessElevators(req,res, next));

  route.get("/floorPlanningMatrix",(req, res, next) => ctrl.getFloorPlanningMatrix(req,res, next));

  route.get("/planningElevatorLocation",(req, res, next) => ctrl.getPlanningElevatorLocation(req,res, next));

  route.get("/planningPathwayLocation",(req, res, next) => ctrl.getPlanningPathwayLocation(req,res, next));

  route.get("/planningRoomsLocation",(req, res, next) => ctrl.getPlanningRoomsLocation(req,res, next));

  route.get("/path/lessBuildings/roomToRoom",(req, res, next) => ctrl.getPathLessBuildingsRoomToRoom(req,res, next));

  route.get("/path/lessElevators/roomToRoom",(req, res, next) => ctrl.getPathLessElevatorsRoomToRoom(req,res, next));

  route.post("/taskSequence",(req, res, next) => ctrl.getTaskSequence(req,res, next));
}
