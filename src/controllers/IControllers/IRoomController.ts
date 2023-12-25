import { NextFunction, Request, Response } from "express";

export default interface IRoomController{
  createRoom(req: Request, res: Response, next: NextFunction);
  getRoomsByBuildingsAndFloor(req: Request, res: Response, next: NextFunction): void;
  getRoomById(req: Request, res: Response, next: NextFunction);
}
