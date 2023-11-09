import { NextFunction, Request, Response } from 'express';

export default interface IPlanningController {
  getFloors(req: Request, res: Response, next: NextFunction);
  getElevators(req: Request, res: Response, next: NextFunction);
  getPatways(req: Request, res: Response, next: NextFunction);
}
