import { NextFunction, Request, Response } from 'express';

export default interface IRobotController {
  createRobot(req: Request, res: Response, next: NextFunction);
  disableRobot(req: Request, res: Response, next: NextFunction);
  consultAllRobots(req: Request, res: Response, next: NextFunction);
  consultRobotsByTaskType(req: Request, res: Response, next: NextFunction);
  consultRobotsByRobotType(req: Request, res: Response, next: NextFunction);
}
