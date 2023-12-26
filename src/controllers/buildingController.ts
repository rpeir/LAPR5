import { Inject, Service } from "typedi";
import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from "../services/IServices/IBuildingService";
import config from "../../config";
import { NextFunction, Request, Response } from "express";
import { IBuildingDTO } from "../dto/IBuildingDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController {
  constructor(@Inject(config.services.building.name) private buildingServiceInstance: IBuildingService) {
  }

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      if (req.auth.user.role.name !== 'campus manager') {
        return res.status(401).json('Não tem permissões para aceder a este recurso').send();
      }
      const buildingOrError = (await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO)) as Result<IBuildingDTO>;
      if (buildingOrError.isFailure) {
        return res
          .status(402)
          .json({ error: buildingOrError.error })
          .send();
      }
      const buildingDTO = buildingOrError.getValue();
      //TODO return res.status(201).json(buildingDTO);
      return res.status(201).json(buildingDTO);
    } catch (error) {
      return next(error);
    }
  }

  //EDIT BUILDING
  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      if (req.auth.user.role.name !== 'campus manager') {
        return res.status(401).json('Não tem permissões para aceder a este recurso').send();
      }
      const buildingOrError = (await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO)) as Result<IBuildingDTO>;
      if (buildingOrError.isFailure) {
        return res.status(402).send();
      }
      const buildingDTO = buildingOrError.getValue();
      return res.status(201).json(buildingDTO);
    } catch (error) {
      return next(error);
    }
  }

  public async listAllBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      if (req.auth.user.role.name !== 'campus manager') {
        return res.status(401).json('Não tem permissões para aceder a este recurso').send();
      }
      const buildingsOrError = (await this.buildingServiceInstance.listAllBuilding()) as Result<IBuildingDTO[]>;
      if (buildingsOrError.isFailure) {
        return res.status(402).send();
      }
      const buildingsDTO = buildingsOrError.getValue();
      return res.status(200).json(buildingsDTO);
    } catch (error) {
      return next(error);
    }
  }
}
