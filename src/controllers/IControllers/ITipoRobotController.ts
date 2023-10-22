import { NextFunction, Request, Response } from "express";

export default interface ITipoRobotController{
    createTipoRobot(req: Request, res: Response, next: NextFunction)
}