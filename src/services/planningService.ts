import { Inject, Service } from "typedi";
import IPlanningService from "./IServices/IPlanningService";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IBuildingService from "./IServices/IBuildingService";
import { PlanningFloor } from "../domain/planningFloor";
import { IPlanningFloorDTO } from "../dto/IPlanningFloorDTO";
import IFloorService from "./IServices/IFloorService";
import { PlanningFloorMapper } from "../mappers/PlanningFloorMapper";
import { IElevatorDTO } from "../dto/IElevatorDTO";
import IElevatorService from "./IServices/IElevatorService";
import { IPathwayDTO } from "../dto/IPathwayDTO";
import IPathwayService from "./IServices/IPathwayService";

@Service()
export default class PlanningService implements IPlanningService {

  constructor(
    @Inject(config.services.building.name) private buildingService: IBuildingService,
    @Inject(config.services.floor.name) private floorService: IFloorService,
    @Inject(config.services.elevator.name) private elevatorService: IElevatorService,
    @Inject(config.services.pathway.name) private pathwayService: IPathwayService
  ) {
  }

  public async getElevators(): Promise<Result<IElevatorDTO[]>> {
    return await this.elevatorService.findAll();
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
        floors = buildingFloors.getValue().map(floor => floor.floorNr);
      }
      const planningFloorOrError = PlanningFloor.create({
        building: building.designation.toLowerCase(),
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

  public async getPatways(): Promise<Result<IPathwayDTO[]>> {
    return await this.pathwayService.findAll();
  }

}
