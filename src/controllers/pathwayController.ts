import { Inject, Service } from 'typedi';
import config from '../../config';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IPathwayController from './IControllers/IPathwayController';
import { IPathwayDTO } from '../dto/IPathwayDTO';
import IPathwayService from '../services/IServices/IPathwayService';

@Service()
export default class PathwayController implements IPathwayController {
  constructor(@Inject(config.services.pathway.name) private pathwayService: IPathwayService) {}

  public async createPathway(req: Request, res: Response, next: NextFunction) {
    try {
      const pathwayOrError = (await this.pathwayService.createPathway(req.body as IPathwayDTO)) as Result<IPathwayDTO>;

      if (pathwayOrError.isFailure) {
        return res.status(402).send(pathwayOrError);
      }

      const pathwayDTO = pathwayOrError.getValue();
      return res.status(201).json(pathwayDTO);
    } catch (error) {
      return error;
    }
  }

  public async replacePathway(req: Request, res: Response, next: NextFunction) {
    try {
      const pathwayOrError = (await this.pathwayService.replacePathway(req.body as IPathwayDTO)) as Result<IPathwayDTO>;

      if (pathwayOrError.isFailure) {
        return res.status(402).send(pathwayOrError);
      }

      const pathwayDTO = pathwayOrError.getValue();
      return res.status(202).json(pathwayDTO);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async updatePathway(req: Request, res: Response, next: NextFunction) {
    try {
      const pathwayOrError = (await this.pathwayService.updatePathway({
        ...req.body,
        domainId: req.query.domainId,
      } as IPathwayDTO)) as Result<IPathwayDTO>;

      if (pathwayOrError.isFailure) {
        return res.status(402).send(pathwayOrError);
      }

      const pathwayDTO = pathwayOrError.getValue();
      return res.status(202).json(pathwayDTO);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async listPathways(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingSource = req.query.buildingSource as string;
      const buildingDestination = req.query.buildingDestination as string;
      const pathwayOrError = (await this.pathwayService.listPathways(buildingSource, buildingDestination)) as Result<
        Array<IPathwayDTO>
      >;

      if (pathwayOrError.isFailure) {
        return res
          .status(402)
          .json({ error: pathwayOrError.error })
          .send();
      }

      const pathwayDTO = pathwayOrError.getValue();
      return res.status(200).json(pathwayDTO);
    } catch (error) {
      throw error;
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    if (req.query.buildingSource || req.query.buildingDestination) {
      next(); return ;
    }
    try {
      const pathwayOrError = (await this.pathwayService.findAll()) as Result<Array<IPathwayDTO>>;

      if (pathwayOrError.isFailure) {
        return res
          .status(402)
          .json({ error: pathwayOrError.error })
          .send();
      }

      const pathwayDTO = pathwayOrError.getValue();
      return res.status(200).json(pathwayDTO);
    } catch (error) {
      throw error;
    }
  }
}
