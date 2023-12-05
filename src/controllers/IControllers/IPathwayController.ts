import { NextFunction, Request, Response } from "express";

export default interface IPathwayController {
  createPathway(req: Request, res: Response, next: NextFunction);
  listPathways(req: Request, res: Response, next: NextFunction);
  replacePathway(req: Request, res: Response, next: NextFunction);
  updatePathway(req: Request, res: Response, next: NextFunction);
  findAll(req: Request, res: Response, next: NextFunction);
}
