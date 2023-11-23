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
import { IPathDTO } from "../dto/IPathDTO";
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

@Service()
export default class PlanningService implements IPlanningService {

  constructor(
    @Inject(config.services.building.name) private buildingService: IBuildingService,
    @Inject(config.services.floor.name) private floorService: IFloorService,
    @Inject(config.services.elevator.name) private elevatorService: IElevatorService,
    @Inject(config.services.pathway.name) private pathwayService: IPathwayService
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
    const http = require("http");
    const options = {
      method: "GET",
      host: "localhost",
      port: 5000,
      path: "/path/lessBuildings?floorSource=" + floorSource + "&floorDestination=" + floorDestination
    };

    return new Promise<Result<IPathDTO>>((resolve) => {
      let result;

      const request = http.request(options, (res) => {
        if (res.statusCode !== 200) {
          result = Result.fail(`Did not get an OK from the server. Code: ${res.statusCode}`);
          res.resume();
          resolve(result);
        }

        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("close", () => {
          result = Result.ok(JSON.parse(data));
          resolve(result);
        });
      });

      request.end();

      request.on("error", (err) => {
        result = Result.fail(`Encountered an error trying to make a request: ${err.message}`);
        resolve(result);
      });
    });
  }

  public async getPathLessElevators(floorSource: string, floorDestination: string) {
    const http = require("http");
    const options = {
      method: "GET",
      host: "localhost",
      port: 5000,
      path: "/path/lessElevators?floorSource=" + floorSource + "&floorDestination=" + floorDestination
    };

    return new Promise<Result<IPathDTO>>((resolve) => {
      let result;

      const request = http.request(options, (res) => {
        if (res.statusCode !== 200) {
          result = Result.fail(`Did not get an OK from the server. Code: ${res.statusCode}`);
          res.resume();
          resolve(result);
        }

        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("close", () => {
          result = Result.ok(JSON.parse(data));
          resolve(result);
        });
      });

      request.end();

      request.on("error", (err) => {
        result = Result.fail(`Encountered an error trying to make a request: ${err.message}`);
        resolve(result);
      });
    });
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
    const planningMatrixOrError = PlanningMatrix.create({ maxLines: floor.floorMap.maze.map.length - 1, maxColumns: floor.floorMap.maze.map[0].length - 1, matrix: matrix });
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

    for (const elevator of floor.floorMap.maze.elevators) {
      const elevatorLocation = PlanningElevatorLocation.create({
        floor: floorSource,
        line: elevator[0],
        column: elevator[1]
      });
      if (elevatorLocation.isFailure) {
        return Result.fail<IPlanningElevatorLocationDTO[]>(elevatorLocation.error);
      }
      elevatorsLocations.push(IPlanningElevatorLocationMapper.toDTO(elevatorLocation.getValue()));
    }
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
}
