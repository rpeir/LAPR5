import { Inject, Service } from "typedi";
import IRobotController from "./IControllers/IRobotController";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import IRobotService from "../services/IServices/IRobotService";
import { IRobotDTO } from "../dto/IRobotDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class RobotController implements IRobotController {

  constructor(
    @Inject(config.services.robot.name) private robotService: IRobotService
  ) {
  }

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotService.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.error);
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);
    } catch (error) {
      throw error;
    }
  }

}
