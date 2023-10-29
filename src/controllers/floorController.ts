import { Inject, Service } from 'typedi';
import IFloorController from './IControllers/IFloorController';
import e, { NextFunction, Request, Response } from 'express';
import config from '../../config';
import IFloorService from '../services/IServices/IFloorService';
import { IFloorDTO } from '../dto/IFloorDTO';
import { Result } from '../core/logic/Result';
import { error } from 'winston';
import { IBuildingDTO } from '../dto/IBuildingDTO';

@Service()
export default class FloorController implements IFloorController {
  constructor(@Inject(config.services.floor.name) private floorServiceInstance: IFloorService) {}

  public async uploadFloorMap(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = (await this.floorServiceInstance.uploadFloorMap(req.body as IFloorDTO)) as Result<IFloorDTO>;
      if (floorOrError.isFailure) {
        return res.status(402).send(floorOrError);
      }
      const floorDTO = floorOrError.getValue();
      return res.json(floorDTO).status(202);
    } catch (error) {
      throw next(error);
    }
  }

  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = (await this.floorServiceInstance.createFloor(req.body as IFloorDTO)) as Result<IFloorDTO>;
      if (floorOrError.isFailure) {
        return res.status(402).send(floorOrError);
      }
      const floorDTO = floorOrError.getValue();
      return res.json(floorDTO).status(201);
    } catch (error) {
      return next(error);
    }
  }

  public async getFloorsOfBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const building = req.query.building;
      const floorOrError = (await this.floorServiceInstance.getFloorsOfBuilding(building.toString())) as Result<
        IFloorDTO[]
      >;

      if (floorOrError.isFailure) {
        return res.status(402).send(floorOrError);
      }

      const floorDTO = floorOrError.getValue();
      return res.json(floorDTO).status(202);
    } catch (error) {
      return next(error);
    }
  }

  public async getBuildingFloorMaxMin(req: Request, res: Response, next: NextFunction) {
    try {
      const max = req.query.max;
      const min = req.query.min;
      const buildings = (await this.floorServiceInstance.getBuildingFloorMaxMin(Number(max), Number(min))) as Result<
        IBuildingDTO[]
      >;

      if (buildings.isFailure) {
        return res.status(402).send(buildings);
      }

      const buildingDTO = buildings.getValue();
      return res.json(buildingDTO).status(202);
    } catch (error) {
      throw next(error);
    }
  }

  public async updateBuildingFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = (await this.floorServiceInstance.updateBuildingFloor(req.body as IFloorDTO)) as Result<IFloorDTO>;

      if (floorOrError.isFailure) {
        return res.status(402).send(floorOrError);
      }

      const floorDTO = floorOrError.getValue();
      return res.json(floorDTO).status(202);
    } catch (error) {
      throw next(error);
    }
  }
  public async listFloorsWithPathways(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingDesignation = req.query.buildingDesignation;
      const floorsOrError = (await this.floorServiceInstance.listFloorsWithPathways(buildingDesignation.toString()));

      if (floorsOrError.isFailure) {
        return res.status(402).send(floorsOrError);
      }

      const floorsDTO = floorsOrError.getValue();
      const json = {};
      floorsDTO.forEach((value, key) => {
        json[key] = value;
      });
      return res.status(200).json(json);
    } catch (error) {
      throw error;
    }
  }
}
