import { Inject, Service } from "typedi";
import IPlanningController from "./IControllers/IPlanningController";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import IPlanningService from "../services/IServices/IPlanningService";

@Service()
export default class PlanningController implements IPlanningController {

  constructor(
    @Inject(config.services.planning.name) private planningService: IPlanningService
  ) {
  }

  public async getFloors(req: Request, res: Response, next: NextFunction) {
    try {
      const infoOrError = await this.planningService.getFloors();

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }

  public async getElevators(req: Request, res: Response, next: NextFunction) {
    try {
      const infoOrError = await this.planningService.getElevators();

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }

  public async getPatways(req: Request, res: Response, next: NextFunction) {
    try {
      const infoOrError = await this.planningService.getPathways();

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }
}
