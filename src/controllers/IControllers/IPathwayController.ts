import { NextFunction, Request, Response } from "express";

export default interface IPathwayController {
  createPathway(req: Request, res: Response, next: NextFunction);
}
