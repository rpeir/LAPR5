import { Container, Inject, Service } from 'typedi';
import IElevatorController from './IControllers/IElevatorController';
import config from '../../config';
import IElevatorService from '../services/IServices/IElevatorService';
import IUserRequestController from './IControllers/IUserRequestController';
import IUserService from '../services/IServices/IUserService';
import { NextFunction, Request, Response } from 'express';
import IUserRequestService from '../services/IServices/IUserRequestService';
import { IUserRequestDTO } from '../dto/IUserRequestDTO';
import { Result } from '../core/logic/Result';
import winston from 'winston';
import AuthService from '../services/userService';
import { IUserDTO } from '../dto/IUserDTO';

@Service()
export default class UserRequestController implements IUserRequestController {
  constructor(@Inject(config.services.userRequest.name) private userRequestServiceInstance: IUserRequestService) {}
  public async listAllRequests(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      if (req.auth.user.role.name !== 'campus manager' && req.auth.user.role.name !== 'user') {
        return res
          .status(401)
          .json('Não tem permissões para aceder a este recurso')
          .send();
      }
      const listOrError = (await this.userRequestServiceInstance.listPendingRequests()) as Result<IUserRequestDTO[]>;
      if (listOrError.isFailure) {
        return res.status(402).json({ error: listOrError.error });
      }

      const elevators = listOrError.getValue();
      return res.status(200).json(elevators);
    } catch (error) {
      return next(error);
    }
  }
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (req.auth.user.role.name !== 'admin') {
      return res
        .status(401)
        .json('Não tem permissões para aceder a este recurso')
        .send();
    }
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body);

    try {
      const userOrError = await this.userRequestServiceInstance.registerUser(req.body as IUserRequestDTO);

      if (userOrError.isFailure) {
        logger.debug(userOrError.errorValue());
        return res.status(401).send(userOrError.errorValue());
      }

      const { userDTO, token } = userOrError.getValue();

      return res.status(201).json({ userDTO, token });
    } catch (e) {
      //logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
  public async declineUser(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      if (req.auth.user.role.name !== 'admin') {
        return res
          .status(401)
          .json('Não tem permissões para aceder a este recurso')
          .send();
      }
      const id = req.params.id as string;
      await this.userRequestServiceInstance.declineUser(id);
      return res.status(200).json({ message: 'User request declined' });
    } catch (err) {
      return next(err);
    }
  }
}
