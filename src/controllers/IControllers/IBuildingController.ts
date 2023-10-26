import { NextFunction, Request, Response } from 'express';

export default interface IBuildingController {
  createBuilding(req: Request, res: Response, next: NextFunction);
  //EDIT BUILDING
  updateBuilding(req: Request, res: Response, next: NextFunction);
}
