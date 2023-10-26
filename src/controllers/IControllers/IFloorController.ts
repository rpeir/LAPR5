import { NextFunction, Request, Response } from "express";

export default interface IFloorController {
  createFloor(req: Request, res: Response, next: NextFunction);

  getFloors(req: Request, res: Response, next: NextFunction);
}
