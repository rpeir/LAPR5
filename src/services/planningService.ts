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

}
