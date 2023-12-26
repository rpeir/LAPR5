import { NextFunction, Request, Response } from 'express';

export default interface IFloorController {
  uploadFloorMap(req: Request, res: Response, next: NextFunction);

  createFloor(req: Request, res: Response, next: NextFunction);

  getFloorsOfBuilding(req: Request, res: Response, next: NextFunction);

  getBuildingFloorMaxMin(req: Request, res: Response, next: NextFunction);

  updateBuildingFloor(req: Request, res: Response, next: NextFunction);

  listFloorsWithPathways(req: Request, res: Response, next: NextFunction);

  getFloorById(req: Request, res: Response, next: NextFunction);
}
