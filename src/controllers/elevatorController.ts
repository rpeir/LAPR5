import {Inject, Service} from "typedi";
import IElevatorController from "./IControllers/IElevatorController";
import config from "../../config";
import {NextFunction, Request, Response} from "express";
import {Result} from "../core/logic/Result";
import {IElevatorDTO} from "../dto/IElevatorDTO";
import IElevatorService from "../services/IServices/IElevatorService";
import {IBuildingDTO} from "../dto/IBuildingDTO";

@Service()
export default class ElevatorController implements IElevatorController{
  constructor(@Inject(config.services.elevator.name)private elevatorServiceInstance:IElevatorService) {}

  public async createElevator(req: Request, res: Response, next: NextFunction){
    try{
      const elevatorOrError=await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;
      if(elevatorOrError.isFailure){
        return res.status(402).send();
      }
      const elevatorDTO= elevatorOrError.getValue();
      return res.json( elevatorDTO).status(201);
    }catch (error){
      return next(error);
    }
  }
  public async listElevator(req:Request,res:Response,next:NextFunction){
    try{
      const listOrError=await this.elevatorServiceInstance.listElevator(req.body.buildingDesignation) as Result<IElevatorDTO[]>;
      if(listOrError.isFailure){
        return res.status(402).send();
      }
      const elevators=listOrError.getValue();
      return res.json(elevators).status(201);
    } catch (error){
      return next(error);
    }
  }
  public async updateElevator(req:Request,res:Response,next:NextFunction){
    try{
      const elevatorOrError=await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;
      if(elevatorOrError.isFailure){
        return res.status(402).send();
      }
      const elevatorDTO= elevatorOrError.getValue();
      return res.json( elevatorDTO).status(201);
    }catch (error){
      return next(error);
    }
  }
}
