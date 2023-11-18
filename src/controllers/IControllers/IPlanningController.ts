import { NextFunction, Request, Response } from 'express';

export default interface IPlanningController {
  getFloors(req: Request, res: Response, next: NextFunction);
  getElevators(req: Request, res: Response, next: NextFunction);
  getPathways(req: Request, res: Response, next: NextFunction);
  getPathLessBuildings(req: Request, res: Response, next: NextFunction);
  getPathLessElevators(req: Request, res: Response, next: NextFunction);
}
