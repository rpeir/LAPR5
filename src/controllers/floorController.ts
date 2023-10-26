import { Inject, Service } from "typedi";
import IFloorController from "./IControllers/IFloorController";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import IFloorService from "../services/IServices/IFloorService";
import { IFloorDTO } from "../dto/IFloorDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class FloorController implements IFloorController {
  constructor(
    @Inject(config.services.floor.name) private floorService: IFloorService
  ) {
  }

  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorService.createFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

      if (floorOrError.isFailure) {
        return res.status(402).send(floorOrError);
      }

      const floorDTO = floorOrError.getValue();
      return res.json(floorDTO).status(202);
    } catch (error) {
      throw error;
    }
  }

  public async getFloorsOfBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorService.getFloorsOfBuilding(req.header("buildingDesignation")) as Result<IFloorDTO[]>;


      if (floorOrError.isFailure) {
        return res.status(402).send(floorOrError);
      }

      const floorDTO = floorOrError.getValue();
      return res.json(floorDTO).status(202);
    } catch (error) {
      throw error;
    }
  }
}
