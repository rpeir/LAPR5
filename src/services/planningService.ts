import { Inject, Service } from "typedi";
import IPlanningService from "./IServices/IPlanningService";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IBuildingService from "./IServices/IBuildingService";
import { PlanningFloor } from "../domain/planning/planningFloor";
import { IPlanningFloorDTO } from "../dto/IPlanningFloorDTO";
import IFloorService from "./IServices/IFloorService";
import { PlanningFloorMapper } from "../mappers/PlanningFloorMapper";
import IElevatorService from "./IServices/IElevatorService";
import IPathwayService from "./IServices/IPathwayService";
import { PlanningPathway } from "../domain/planning/planningPathway";
import { PlanningElevator } from "../domain/planning/planningElevator";
import { PlanningElevatorMapper } from "../mappers/PlanningElevatorMapper";
import { IPlanningElevatorDTO } from "../dto/IPlanningElevatorDTO";
import { PlanningPathwayMapper } from "../mappers/PlanningPathwayMapper";
import { IPlanningPathwayDTO } from "../dto/IPlanningPathwayDTO";
import { PlanningMatrix } from "../domain/planning/planningMatrix";
import { PlanningMatrixMapper } from "../mappers/PlanningMatrixMapper";
import { PlanningElevatorLocation } from "../domain/planning/planningElevatorLocation";
import { IPlanningElevatorLocationMapper } from "../mappers/IPlanningElevatorLocationMapper";
import { PlanningPathwayLocation } from "../domain/planning/planningPathwayLocation";
import { PlanningPathwayLocationMapper } from "../mappers/PlanningPathwayLocationMapper";
import { IPlanningPathwayLocationDTO } from "../dto/IPlanningPathwayLocationDTO";
import { IPlanningRoomLocationDTO } from "../dto/IPlanningRoomLocationDTO";
import { PlanningRoomLocationMapper } from "../mappers/PlanningRoomLocationMapper";
import { PlanningRoomLocation } from "../domain/planning/planningRoomLocation";
import { IPlanningElevatorLocationDTO } from "../dto/IPlanningElevatorLocationDTO";
import { IPlanningMatrixDTO } from "../dto/IPlanningMatrixDTO";
import IPlanningAdapter from "../adapters/IAdapters/IPlanningAdapter";
import { Task } from "../domain/task/task";
import { PlanningTaskDTO } from "../dto/PlanningTaskDTO";

@Service()
export default class PlanningService implements IPlanningService {

  constructor(
    @Inject(config.services.building.name) private buildingService: IBuildingService,
    @Inject(config.services.floor.name) private floorService: IFloorService,
    @Inject(config.services.elevator.name) private elevatorService: IElevatorService,
    @Inject(config.services.pathway.name) private pathwayService: IPathwayService,
    @Inject(config.adapters.planningAdapter.name) private planningAdapter: IPlanningAdapter
  ) {
  }

  public async getElevators(): Promise<Result<IPlanningElevatorDTO[]>> {
    const elevators = await this.elevatorService.findAll();

    if (elevators.isFailure) {
      throw elevators.error;
    }
    let planningElevators = [];
    for (const elevator of elevators.getValue()) {
      let floors = elevator.floorsServed.map(floor => elevator.buildingDesignation + "_" + floor);

      const planningElevatorOrError = PlanningElevator.create({
        building: elevator.buildingDesignation,
        floors: floors
      });

      if (planningElevatorOrError.isFailure) {
        return Result.fail<IPlanningElevatorDTO[]>(planningElevatorOrError.error);
      }
      const planningElevator = planningElevatorOrError.getValue();
      planningElevators.push(PlanningElevatorMapper.toDTO(planningElevator));
    }
    return Result.ok<IPlanningElevatorDTO[]>(planningElevators);
  }

  public async getFloors(): Promise<Result<IPlanningFloorDTO[]>> {
    const buildings = await this.buildingService.listAllBuilding();
    if (buildings.isFailure) {
      throw buildings.error;
    }
    let planningFloors = [];
    for (const building of buildings.getValue()) {
      let buildingFloors = await this.floorService.getFloorsOfBuilding(building.designation);

      let floors;
      if (buildingFloors.isFailure) {
        floors = [];
      } else {
        floors = buildingFloors.getValue().map(floor => floor.building + "_" + floor.floorNr);
      }
      const planningFloorOrError = PlanningFloor.create({
        building: building.designation,
        floors: floors
      });

      if (planningFloorOrError.isFailure) {
        return Result.fail<IPlanningFloorDTO[]>(planningFloorOrError.error);
      }
      const planningFloor = planningFloorOrError.getValue();


      planningFloors.push(PlanningFloorMapper.toDTO(planningFloor));
    }
    return Result.ok<IPlanningFloorDTO[]>(planningFloors);
  }

  public async getPathways(): Promise<Result<IPlanningPathwayDTO[]>> {
    const pathways = await this.pathwayService.findAll();
    if (pathways.isFailure) {
      throw pathways.error;
    }
    let planningPathways = [];
    for (const pathway of pathways.getValue()) {
      const pathwayOrError = PlanningPathway.create({
        buildingSource: pathway.buildingSource,
        buildingDestination: pathway.buildingDestination,
        floorSource: pathway.buildingSource + "_" + pathway.floorSource.toString(),
        floorDestination: pathway.buildingDestination + "_" + pathway.floorDestination.toString()
      });

      if (pathwayOrError.isFailure) {
        return Result.fail<IPlanningPathwayDTO[]>(pathwayOrError.error);
      }
      const planningPathway = pathwayOrError.getValue();
      planningPathways.push(PlanningPathwayMapper.toDTO(planningPathway));
    }
    return Result.ok<IPlanningPathwayDTO[]>(planningPathways);
  }

  public async getPathLessBuildings(floorSource: string, floorDestination: string) {
    return this.planningAdapter.getPathLessBuildings(floorSource, floorDestination);
  }

  public async getPathLessElevators(floorSource: string, floorDestination: string) {
    return this.planningAdapter.getPathLessElevators(floorSource, floorDestination);
  }

  public async getFloorPlanningMatrix(floorSource: string) {
    let split = floorSource.split("_");
    const buildingOrError = await this.buildingService.getBuildingByDesignation(split[0]);

    if (buildingOrError.isFailure) {
      return Result.fail<IPlanningMatrixDTO>(buildingOrError.error);
    }

    const floorOrError = await this.floorService.findByBuildingIdAndFloorNr(buildingOrError.getValue().domainId, parseInt(split[1]));
    if (floorOrError.isFailure) {
      return Result.fail<IPlanningMatrixDTO>(floorOrError.error);
    }

    const floor = floorOrError.getValue();

    let matrix: {
      line: number,
      column: number,
      value: number
    }[] = [];

    for (let lines = 0; lines < floor.floorMap.maze.map.length - 1; lines++) {
      for (let column = 0; column < floor.floorMap.maze.map[0].length - 1; column++) {
        let value = floor.floorMap.maze.map[lines][column];
        matrix.push({ line: lines, column: column, value: value });
      }
    }
    const planningMatrixOrError = PlanningMatrix.create({
      maxLines: floor.floorMap.maze.map.length - 1,
      maxColumns: floor.floorMap.maze.map[0].length - 1,
      matrix: matrix
    });
    if (planningMatrixOrError.isFailure) {
      return Result.fail<IPlanningMatrixDTO>(planningMatrixOrError.error);
    }
    return Result.ok<IPlanningMatrixDTO>(PlanningMatrixMapper.toDTO(planningMatrixOrError.getValue()));
  }

  public async getPlanningElevatorLocation(floorSource: string) {
    let split = floorSource.split("_");
    const buildingOrError = await this.buildingService.getBuildingByDesignation(split[0]);

    if (buildingOrError.isFailure) {
      return Result.fail<IPlanningElevatorLocationDTO[]>(buildingOrError.error);
    }

    let elevatorsLocations = [];
    const floorOrError = await this.floorService.findByBuildingIdAndFloorNr(buildingOrError.getValue().domainId, parseInt(split[1]));
    if (floorOrError.isFailure) {
      return Result.fail<IPlanningElevatorLocationDTO[]>(floorOrError.error);
    }

    const floor = floorOrError.getValue();

    const elevator = floor.floorMap.maze.elevators;
    const elevatorLocation = PlanningElevatorLocation.create({
      floor: floorSource,
      line: elevator[0],
      column: elevator[1]
    });
    if (elevatorLocation.isFailure) {
      return Result.fail<IPlanningElevatorLocationDTO[]>(elevatorLocation.error);
    }
    elevatorsLocations.push(IPlanningElevatorLocationMapper.toDTO(elevatorLocation.getValue()));

    return Result.ok<IPlanningElevatorLocationDTO[]>(elevatorsLocations);
  }

  public async getPlanningPathwayLocation(floorSource: string) {
    let split = floorSource.split("_");
    const buildingOrError = await this.buildingService.getBuildingByDesignation(split[0]);

    if (buildingOrError.isFailure) {
      return Result.fail<IPlanningPathwayLocationDTO[]>(buildingOrError.error);
    }

    const floorOrError = await this.floorService.findByBuildingIdAndFloorNr(buildingOrError.getValue().domainId, parseInt(split[1]));
    if (floorOrError.isFailure) {
      return Result.fail<IPlanningPathwayLocationDTO[]>(floorOrError.error);
    }

    let pathwaysLocations = [];
    const floor = floorOrError.getValue();
    for (const pathway of floor.floorMap.maze.exitLocation) {
      const pathwayLocation = PlanningPathwayLocation.create({
        floorSource: floorSource,
        floorDestination: pathway.floorId,
        line: pathway.location[0],
        column: pathway.location[1]
      });
      if (pathwayLocation.isFailure) {
        return Result.fail<IPlanningPathwayLocationDTO[]>(pathwayLocation.error);
      }
      pathwaysLocations.push(PlanningPathwayLocationMapper.toDTO(pathwayLocation.getValue()));
    }
    return Result.ok<IPlanningPathwayLocationDTO[]>(pathwaysLocations);
  }

  public async getPlanningRoomsLocation(floorSource: string) {
    let split = floorSource.split("_");
    const buildingOrError = await this.buildingService.getBuildingByDesignation(split[0]);
    if (buildingOrError.isFailure) {
      return Result.fail<IPlanningRoomLocationDTO[]>(buildingOrError.error);
    }

    const floorOrError = await this.floorService.findByBuildingIdAndFloorNr(buildingOrError.getValue().domainId, parseInt(split[1]));
    if (floorOrError.isFailure) {
      return Result.fail<IPlanningRoomLocationDTO[]>(floorOrError.error);
    }
    let roomsLocations = [];
    const floor = floorOrError.getValue();
    for (const room of floor.floorMap.maze.rooms) {
      const roomLocation = PlanningRoomLocation.create({
        floor: floorSource,
        room: room.roomId,
        line: room.position[0],
        column: room.position[1]
      });
      if (roomLocation.isFailure) {
        return Result.fail<IPlanningRoomLocationDTO[]>(roomLocation.error);
      }
      roomsLocations.push(PlanningRoomLocationMapper.toDTO(roomLocation.getValue()));
    }
    return Result.ok<IPlanningRoomLocationDTO[]>(roomsLocations);
  }

  public async getPathLessBuildingsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string) {
    return this.planningAdapter.getPathLessBuildingsRoomToRoom(floorSource, floorDestination, roomSource, roomDestination);
  }

  public async getPathLessElevatorsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string) {
    return this.planningAdapter.getPathLessElevatorsRoomToRoom(floorSource, floorDestination, roomSource, roomDestination);
  }

  public async getTaskSequence(nrGenerations: number, stabilizationCriteriaValue: number, idealCost: number, populationSize: number, crossoverProbability: number, mutationProbability: number, elitismRate: number, tasks: Task[]): Promise<Result<PlanningTaskDTO[]>> {
    let planningTask: PlanningTaskDTO[] = [];
    for (const task of tasks) {
      const buildingSourceOrError = await this.buildingService.getBuildingByCode(task.pickupRoomId.building.value);
      if (buildingSourceOrError.isFailure) {
        return Result.fail<PlanningTaskDTO[]>(buildingSourceOrError.error);
      }
      const buildingSource = buildingSourceOrError.getValue();
      const floorSourceOrError = await this.floorService.findByBuildingIdAndFloorNr(buildingSource.domainId, task.pickupRoomId.floor);
      if (floorSourceOrError.isFailure) {
        return Result.fail<PlanningTaskDTO[]>(floorSourceOrError.error);
      }

      const buildingDestinationOrError = await this.buildingService.getBuildingByCode(task.deliveryRoomId.building.value);
      if (buildingDestinationOrError.isFailure) {
        return Result.fail<PlanningTaskDTO[]>(buildingDestinationOrError.error);
      }
      const buildingDestination = buildingDestinationOrError.getValue();

      const floorDestinationOrError = await this.floorService.findByBuildingIdAndFloorNr(buildingDestination.domainId, task.deliveryRoomId.floor);
      if (floorDestinationOrError.isFailure) {
        return Result.fail<PlanningTaskDTO[]>(floorDestinationOrError.error);
      }
      const floorSource = floorSourceOrError.getValue();
      const floorDestination = floorDestinationOrError.getValue();

      const planningTaskDTO = {
        id : task.id.toString(),
        pickupRoom: task.pickupRoomId.name,
        deliveryRoom: task.deliveryRoomId.name,
        pickupFloor: floorSource.building + "_" + floorSource.floorNr,
        deliveryFloor: floorDestination.building + "_" + floorDestination.floorNr
      }

      planningTask.push(planningTaskDTO);
    }
    return this.planningAdapter.getTaskSequence(nrGenerations, stabilizationCriteriaValue, idealCost, populationSize, crossoverProbability, mutationProbability, elitismRate, planningTask);
  }
}
