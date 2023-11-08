import { Inject, Service } from "typedi";
import IPathwayService from "./IServices/IPathwayService";
import { IPathwayDTO } from "../dto/IPathwayDTO";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import IPathwayRepo from "./IRepos/IPathwayRepo";
import { Building } from "../domain/building/building";
import { Pathway } from "../domain/pathway/pathway";
import { PathwayMap } from "../mappers/PathwayMap";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Floor} from "../domain/floor/floor";

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
        return Result.fail<IPathwayDTO>(buildingSourceOrError.error);
      } else {
        buildingSource = buildingSourceOrError.getValue();
      }

      let buildingDestination;
      const buildingDestinationOrError = await this.getBuildingByDesignation(pathwayDTO.buildingDestination);
      if (buildingDestinationOrError.isFailure) {
        return Result.fail<IPathwayDTO>(buildingDestinationOrError.error);
      } else {
        buildingDestination = buildingDestinationOrError.getValue();
      }

      let floorSource;
      const floorSourceOrError = await this.getFloorByBuildingIdAndFloorNr(buildingSource, pathwayDTO.floorSource);
      if (floorSourceOrError.isFailure) {
        return Result.fail<IPathwayDTO>(floorSourceOrError.error);
      } else {
        floorSource = floorSourceOrError.getValue();
      }

      let floorDestination;
      const floorDestinationOrError = await this.getFloorByBuildingIdAndFloorNr(buildingDestination, pathwayDTO.floorDestination);
      if (floorDestinationOrError.isFailure) {
        return Result.fail<IPathwayDTO>(floorDestinationOrError.error);
      } else {
        floorDestination = floorDestinationOrError.getValue();
      }

      if (await this.pathwayRepo.existsPathwayBetweenFloors(floorSource, floorDestination)) {
       return Result.fail<IPathwayDTO>(`Pathway between floors ${floorSource.floorNr} and ${floorDestination.floorNr} already exists`);
      }

      const pathwayOrError = Pathway.create({
        buildingSource: buildingSource,
        buildingDestination: buildingDestination,
        floorSource: floorSource,
        floorDestination: floorDestination,
        description: pathwayDTO.description
      });

      if (pathwayOrError.isFailure) {
        return Result.fail<IPathwayDTO>(pathwayOrError.errorValue());
      }
      let pathwayResult = pathwayOrError.getValue();
      try {
        pathwayResult = await this.pathwayRepo.save(pathwayResult);
      } catch (err) {
        return Result.fail<IPathwayDTO>(err.message);
      }

      const pathwayDTOResult = PathwayMap.toDTO(pathwayResult) as IPathwayDTO;
      return Result.ok<IPathwayDTO>(pathwayDTOResult);
    } catch (err) {
      throw err;
    }
  }

  public async replacePathway(pathwayDTO: IPathwayDTO): Promise<Result<IPathwayDTO>> {
    try {
      let buildingSource;
      const buildingSourceOrError = await this.getBuildingByDesignation(pathwayDTO.buildingSource);
      if (buildingSourceOrError.isFailure) {
        return Result.fail<IPathwayDTO>(buildingSourceOrError.error);
      } else {
        buildingSource = buildingSourceOrError.getValue();
      }

      let buildingDestination;
      const buildingDestinationOrError = await this.getBuildingByDesignation(pathwayDTO.buildingDestination);
      if (buildingDestinationOrError.isFailure) {
        return Result.fail<IPathwayDTO>(buildingDestinationOrError.error);
      } else {
        buildingDestination = buildingDestinationOrError.getValue();
      }

      let floorSource;
      const floorSourceOrError = await this.getFloorByBuildingIdAndFloorNr(buildingSource, pathwayDTO.floorSource);
      if (floorSourceOrError.isFailure) {
        return Result.fail<IPathwayDTO>(floorSourceOrError.error);
      } else {
        floorSource = floorSourceOrError.getValue();
      }

      let floorDestination;
      const floorDestinationOrError = await this.getFloorByBuildingIdAndFloorNr(buildingDestination, pathwayDTO.floorDestination);
      if (floorDestinationOrError.isFailure) {
        return Result.fail<IPathwayDTO>(floorDestinationOrError.error);
      } else {
        floorDestination = floorDestinationOrError.getValue();
      }

      const pathwayOrError = Pathway.create({
        buildingSource: buildingSource,
        buildingDestination: buildingDestination,
        floorSource: floorSource,
        floorDestination: floorDestination,
        description: pathwayDTO.description
      }, new UniqueEntityID(pathwayDTO.domainId));

      if (pathwayOrError.isFailure) {
        return Result.fail<IPathwayDTO>(pathwayOrError.errorValue());
      }
      let pathwayResult = pathwayOrError.getValue();
      try {
        pathwayResult = await this.pathwayRepo.save(pathwayResult);
      } catch (err) {
        return Result.fail<IPathwayDTO>(err);
      }

      const pathwayDTOResult = PathwayMap.toDTO(pathwayResult) as IPathwayDTO;
      return Result.ok<IPathwayDTO>(pathwayDTOResult);
    } catch (err) {
      throw err;
    }
  }

  public async updatePathway(pathwayDTO: IPathwayDTO): Promise<Result<IPathwayDTO>> {
    try {
      let pathway = await this.pathwayRepo.findById(pathwayDTO.domainId);
      if (!pathway) return Result.fail<IPathwayDTO>("Pathway not found");

      let buildingSource : Building;
      if (pathwayDTO.buildingSource) {
        const buildingSourceOrError = await this.getBuildingByDesignation(pathwayDTO.buildingSource);
        if (buildingSourceOrError.isFailure) return Result.fail<IPathwayDTO>(buildingSourceOrError.error);
        buildingSource = buildingSourceOrError.getValue();
      } else {
        buildingSource = pathway.buildingSource;
      }

      let buildingDestination : Building;
      if (pathwayDTO.buildingDestination) {
        const buildingDestinationOrError = await this.getBuildingByDesignation(pathwayDTO.buildingDestination);
        if (buildingDestinationOrError.isFailure) return Result.fail<IPathwayDTO>(buildingDestinationOrError.error);
        buildingDestination = buildingDestinationOrError.getValue();
      } else {
        buildingDestination = pathway.buildingDestination;
      }

      let floorSource : Floor;
      if (pathwayDTO.floorSource || pathwayDTO.buildingSource) {
        const floorSourceOrError = await this.getFloorByBuildingIdAndFloorNr(buildingSource, pathwayDTO.floorSource?pathwayDTO.floorSource:pathway.floorSource.floorNr);
        if (floorSourceOrError.isFailure) return Result.fail<IPathwayDTO>(floorSourceOrError.error);
        floorSource = floorSourceOrError.getValue();
      } else {
        floorSource = pathway.floorSource;
      }

      let floorDestination : Floor;
      if (pathwayDTO.floorDestination || pathwayDTO.buildingDestination) {
        const floorDestinationOrError = await this.getFloorByBuildingIdAndFloorNr(buildingDestination, pathwayDTO.floorDestination?pathwayDTO.floorDestination:pathway.floorDestination.floorNr);
        if (floorDestinationOrError.isFailure) return Result.fail<IPathwayDTO>(floorDestinationOrError.error);
        floorDestination = floorDestinationOrError.getValue();
      } else {
        floorDestination = pathway.floorDestination;
      }

      const pathwayOrError = Pathway.create({
        buildingSource: buildingSource,
        buildingDestination: buildingDestination,
        floorSource: floorSource,
        floorDestination: floorDestination,
        description: pathwayDTO.description?pathwayDTO.description:pathway.description
      }, new UniqueEntityID(pathwayDTO.domainId));

      if (pathwayOrError.isFailure) {
        return Result.fail<IPathwayDTO>(pathwayOrError.errorValue());
      }
      let pathwayResult = pathwayOrError.getValue();
      try {
        pathwayResult = await this.pathwayRepo.save(pathwayResult);
      } catch (err) {
        return Result.fail<IPathwayDTO>(err);
      }

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
      return Result.fail<Building>("Couldn't find building: " + buildingDesignation);
    }
  }

  public async getFloorByBuildingIdAndFloorNr(building: Building, floorNr: number) {
    const floor = await this.floorRepo.findByBuildingIdAndFloorNr(building.id.toString(), floorNr);
    if (!!floor) {
      return Result.ok<Floor>(floor);
    } else {
      return Result.fail<Floor>("Couldn't find floor: " + floorNr + ` of building ${building.designation}`);
    }
  }
  public async listPathways(source:string,dest:string): Promise<Result<Array<IPathwayDTO>>> {
    try {
      const pathways = await this.pathwayRepo.findAll(source,dest);
      const pathwaysDTO = pathways.map((pathway) => PathwayMap.toDTO(pathway) as IPathwayDTO);
      if(pathwaysDTO.length==0){
        return Result.fail<Array<IPathwayDTO>>("No pathways found for specified buildings");
      }
      return Result.ok<Array<IPathwayDTO>>(pathwaysDTO);
    } catch (err) {
      throw err;
    }
  }
}
