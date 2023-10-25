import {Inject, Service} from "typedi";
import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from "../services/IServices/IBuildingService";
import config from "../../config";
import {NextFunction, Request, Response} from "express";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {Result} from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController{
  constructor(
    @Inject(config.services.building.name) private buildingServiceInstance: IBuildingService
  ) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction){
    try{
      const buildingOrError=await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;
      if(buildingOrError.isFailure){
        return res.status(402).send();
      }
      const buildingDTO= buildingOrError.getValue();
      return res.json( buildingDTO).status(201);
    } catch (error){
      return next(error);
    }
  }
}
