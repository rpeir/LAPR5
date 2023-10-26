import { Inject, Service } from "typedi";
import IPathwayService from "./IServices/IPathwayService";
import { IPathwayDTO } from "../dto/IPathwayDTO";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import IPathwayRepo from "./IRepos/IPathwayRepo";
import { Building } from "../domain/building";
import { Pathway } from "../domain/pathway";
import { PathwayMap } from "../mappers/PathwayMap";

@Service()
export default class PathwayService implements IPathwayService {
  constructor(
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.pathway.name) private pathwayRepo: IPathwayRepo
  ) {
  }

  public async createPathway(pathwayDTO: IPathwayDTO): Promise<Result<IPathwayDTO>> {
    try {
      let buildingSource;
      const buildingSourceOrError = await this.getBuildingByDesignation(pathwayDTO.buildingSource);
      if (buildingSourceOrError.isFailure) {
        return Result.fail<IPathwayDTO>(buildingSourceOrError);
      } else {
        buildingSource = buildingSourceOrError.getValue();
      }

      let buildingDestination;
      const buildingDestinationOrError = await this.getBuildingByDesignation(pathwayDTO.buildingDestination);
      if (buildingDestinationOrError.isFailure) {
        return Result.fail<IPathwayDTO>(buildingDestinationOrError);
      } else {
        buildingDestination = buildingDestinationOrError.getValue();
      }

      let floorSource;
      const floorSourceOrError = await this.getFloorByBuildingIdAndFloorNr(buildingSource.id.toString(), pathwayDTO.floorSource);
      if (floorSourceOrError.isFailure) {
        return Result.fail<IPathwayDTO>(floorSourceOrError);
      } else {
        floorSource = floorSourceOrError.getValue();
      }

      let floorDestination;
      const floorDestinationOrError = await this.getFloorByBuildingIdAndFloorNr(buildingDestination.id.toString(), pathwayDTO.floorDestination);
      if (floorDestinationOrError.isFailure) {
        return Result.fail<IPathwayDTO>(floorDestinationOrError);
      } else {
        floorDestination = floorDestinationOrError.getValue();
      }

      console.log(floorDestination)

      const pathwayOrError = Pathway.create({
        buildingSource: buildingSource,
        buildingDestination: buildingDestination,
        floorSource: floorSource,
        floorDestination: floorDestination,
        description: pathwayDTO.description
      });

      if (pathwayOrError.isFailure) {
        throw Result.fail<IPathwayDTO>(pathwayOrError.errorValue());
      }
      const pathwayResult = pathwayOrError.getValue();
      await this.pathwayRepo.save(pathwayResult);
      const pathwayDTOResult = PathwayMap.toDTO(pathwayResult) as IPathwayDTO;
      return Result.ok<IPathwayDTO>(pathwayDTOResult);
    } catch (err) {
      throw err;
    }
  }

  public async getBuildingByDesignation(buildingDesignation: string) {
    const building = await this.buildingRepo.findByDesignation(buildingDesignation);
    if (!!building) {
      return Result.ok<Building>(building);
    } else {
      return Result.fail("Couldn't find building: " + buildingDesignation);
    }
  }

  public async getFloorByBuildingIdAndFloorNr(buildingId: string, floorNr: number) {
    const floor = await this.floorRepo.findByBuildingIdAndFloorNr(buildingId, floorNr);
    if (!!floor) {
      return Result.ok(floor);
    } else {
      return Result.fail("Couldn't find floor: " + floorNr);
    }
  }
}
