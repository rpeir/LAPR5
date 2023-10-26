import {NextFunction, Request, Response} from "express";

export default interface IElevatorController{
  createElevator(req: Request, res:Response, next:NextFunction);
  listElevator(req:Request,res:Response, next:NextFunction);
    updateElevator(req:Request,res:Response,next:NextFunction);
}
