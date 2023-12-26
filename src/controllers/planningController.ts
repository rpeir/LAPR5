import { Inject, Service } from "typedi";
import IPlanningController from "./IControllers/IPlanningController";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import IPlanningService from "../services/IServices/IPlanningService";
import { Task } from "../domain/task/task";
import { ITaskDTO } from "../dto/ITaskDTO";
import { TaskMapper } from "../mappers/TaskMapper";

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

  public async getPathways(req: Request, res: Response, next: NextFunction) {
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

  public async getFloorPlanningMatrix(req: Request, res: Response, next: NextFunction) {
    try {
      const floor = req.query.floor as string;
      const infoOrError = await this.planningService.getFloorPlanningMatrix(floor);

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }

  public async getPathLessBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      const sourceBuilding = req.query.sourceBuilding as string;
      const sourceFloor = req.query.sourceFloor as string;
      const destinationBuilding = req.query.destinationBuilding as string;
      const destinationFloor = req.query.destinationFloor as string;
      const infoOrError = await this.planningService.getPathLessBuildings(sourceBuilding + "_" + sourceFloor, destinationBuilding + "_" + destinationFloor);

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }

  public async getPathLessElevators(req: Request, res: Response, next: NextFunction) {
    try {
      const sourceBuilding = req.query.sourceBuilding as string;
      const sourceFloor = req.query.sourceFloor as string;
      const destinationBuilding = req.query.destinationBuilding as string;
      const destinationFloor = req.query.destinationFloor as string;
      const infoOrError = await this.planningService.getPathLessElevators(sourceBuilding + "_" + sourceFloor, destinationBuilding + "_" + destinationFloor);

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }

  }

  public async getPlanningElevatorLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const floor = req.query.floor as string;
      const infoOrError = await this.planningService.getPlanningElevatorLocation(floor);

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }

  public async getPlanningPathwayLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const floor = req.query.floor as string;
      const infoOrError = await this.planningService.getPlanningPathwayLocation(floor);

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }

  public async getPlanningRoomsLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const floor = req.query.floor as string;
      const infoOrError = await this.planningService.getPlanningRoomsLocation(floor);

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }

  public async getPathLessBuildingsRoomToRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const sourceBuilding = req.query.sourceBuilding as string;
      const destinationBuilding = req.query.destinationBuilding as string;
      const sourceFloor = req.query.sourceFloor as string;
      const destinationFloor = req.query.destinationFloor as string;
      const roomSource = req.query.roomSource as string;
      const roomDestination = req.query.roomDestination as string;
      const infoOrError = await this.planningService.getPathLessBuildingsRoomToRoom(sourceBuilding + "_" + sourceFloor, destinationBuilding + "_" + destinationFloor, roomSource, roomDestination);

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }

  public async getPathLessElevatorsRoomToRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const sourceBuilding = req.query.sourceBuilding as string;
      const destinationBuilding = req.query.destinationBuilding as string;
      const sourceFloor = req.query.sourceFloor as string;
      const destinationFloor = req.query.destinationFloor as string;
      const roomSource = req.query.roomSource as string;
      const roomDestination = req.query.roomDestination as string;
      const infoOrError = await this.planningService.getPathLessElevatorsRoomToRoom(sourceBuilding + "_" + sourceFloor, destinationBuilding + "_" + destinationFloor, roomSource, roomDestination);

      if (infoOrError.isFailure) {
        return res.status(402).json({ error: infoOrError.error }).send();
      }
      const infoDTO = infoOrError.getValue();
      return res.json(infoDTO).status(200);
    } catch (error) {
      return next(error);
    }
  }

  public async getTaskSequence(req: Request, res: Response, next: NextFunction) {
    try {
      const nrGenerations = req.query.nrGenerations as string;
      const stabilizationCriteriaValue = req.query.stabilizationCriteriaValue as string;
      const idealCost = req.query.idealCost as string;
      const populationSize = req.query.populationSize as string;
      const crossoverProbability = req.query.crossoverProbability as string;
      const mutationProbability = req.query.mutationProbability as string;
      const elitismRate = req.query.elitismRate as string;
      const taskDTOS = req.body as ITaskDTO[];
      const taskResult = [];
      const tasks = await Promise.all(taskDTOS.map(taskDTO => TaskMapper.toDomain(taskDTO)));

      const planningTaskOrError = await this.planningService.getTaskSequence(parseInt(nrGenerations), parseInt(stabilizationCriteriaValue), parseInt(idealCost), parseInt(populationSize), parseFloat(crossoverProbability), parseFloat(mutationProbability), parseFloat(elitismRate), tasks);

      if (planningTaskOrError.isFailure) {
        return res.status(402).json({ error: planningTaskOrError.error }).send();
      }
      const planningTask = planningTaskOrError.getValue();

      planningTask.forEach(plannedTask => {
        taskDTOS.forEach(unplannedTask => {
          if (unplannedTask.id.toString() == plannedTask.id){
            taskResult.push(unplannedTask)
          }
        });
      });


      return res.json(taskResult).status(200);
    }catch (error){
      return next(error);
    }
  }

}
