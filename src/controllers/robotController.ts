import { Inject, Service } from 'typedi';
import IRobotController from './IControllers/IRobotController';
import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import IRobotService from '../services/IServices/IRobotService';
import { IRobotDTO } from '../dto/IRobotDTO';
import { Result } from '../core/logic/Result';

@Service()
export default class RobotController implements IRobotController {
  constructor(@Inject(config.services.robot.name) private robotServiceInstance: IRobotService) {}

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = (await this.robotServiceInstance.createRobot(req.body as IRobotDTO)) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.error);
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);
    } catch (error) {
      return  next(error);
    }
  }

  public async disableRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = (await this.robotServiceInstance.disableRobot(req.body as IRobotDTO)) as Result<IRobotDTO>;
      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.error);
      }
      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);
    } catch (error) {
      throw next(error);
    }
  }
  public async consultAllRobots(req: Request, res: Response, next: NextFunction) {
    try{
      const robotOrError = (await this.robotServiceInstance.consultAllRobots()) as Result<IRobotDTO[]>;
      if (robotOrError.isFailure) {
        return res.status(402).json(robotOrError.error).send();
      }
      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(200);

    }catch(error){
      throw next(error);
    }
  }
}
