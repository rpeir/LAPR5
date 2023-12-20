import { Inject, Service } from 'typedi';
import IRobotTypeController from './IControllers/IRobotTypeController';
import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import { IRobotTypeDTO } from '../dto/IRobotTypeDTO';
import { Result } from '../core/logic/Result';

@Service()
export default class RobotTypeController implements IRobotTypeController {
  constructor(@Inject(config.services.robotType.name) private robotTypeService: IRobotTypeService) {}

  public async createRobotType(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.auth.user.role.name !== 'fleet manager') {
        return res.status(401).json('Não tem permissões para aceder a este recurso').send();
      }
      const robotTypeOrError = (await this.robotTypeService.createRobotType(req.body as IRobotTypeDTO)) as Result<IRobotTypeDTO>;

      if (robotTypeOrError.isFailure) {
        return res.status(402).send(robotTypeOrError.error);
      }

      const robotTypeDTO = robotTypeOrError.getValue();
      return res.status(201).json(robotTypeDTO);
    } catch (error) {
      return next(error);
    }
  }

  public async getRobotTypes(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.auth.user.role.name !== 'fleet manager') {
        return res.status(401).json('Não tem permissões para aceder a este recurso').send();
      }
      const robotTypesOrError = (await this.robotTypeService.getRobotTypes()) as Result<IRobotTypeDTO[]>;

      if (robotTypesOrError.isFailure) {
        return res.status(402).send(robotTypesOrError.error);
      }

      const robotTypesDTO = robotTypesOrError.getValue();
      return res.status(201).json(robotTypesDTO);
    } catch (error) {
      return next(error);
    }
  }
}
