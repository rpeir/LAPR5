import IFloorService from './IServices/IFloorService';
import { IFloorDTO } from '../dto/IFloorDTO';
import { Result } from '../core/logic/Result';
import { Inject, Service } from 'typedi';
import config from '../../config';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import { Building } from '../domain/building/building';
import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/FloorMap';
import { IBuildingDTO } from '../dto/IBuildingDTO';
import { BuildingMap } from '../mappers/BuildingMap';
import { FloorMapStructure } from '../domain/floorMapStructure';
import { ExceptionHandler } from 'winston';
import { error } from 'console';
import { on } from 'events';
import e from 'express';
import IPathwayRepo from "./IRepos/IPathwayRepo";

@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.pathway.name) private pathwayRepo: IPathwayRepo,
  ) {}

  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      let building;
      const buildingOrError = await this.getBuildingByDesignation(floorDTO.building);
      if (buildingOrError.isFailure) {
        return Result.fail<IFloorDTO>(buildingOrError);
      } else {
        building = buildingOrError.getValue();
      }

      const floorOrError = Floor.create({
        description: floorDTO.description,
        floorNr: floorDTO.floorNr,
        building: building,
      });

      if (floorOrError.isFailure) {
        return Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

      let floorResult = floorOrError.getValue();
      try {
        floorResult = await this.floorRepo.save(floorResult);
      } catch (err) {
        return Result.fail<IFloorDTO>(err.message);
      }

      const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
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

  public async getFloorsOfBuilding(buildingDesignation: string): Promise<Result<IFloorDTO[]>> {
    try {
      let building;
      const buildingOrError = await this.getBuildingByDesignation(buildingDesignation);
      if (buildingOrError.isFailure) {
        return Result.fail<IFloorDTO[]>(buildingOrError.error);
      } else {
        building = buildingOrError.getValue();
      }
      const floors = await this.floorRepo.findByBuildingId(building.id.toString());
      if (floors.length === 0) {
        return Result.fail<IFloorDTO[]>("Couldn't find floors for building: " + buildingDesignation);
      }
      const floorDTOs = floors.map(floor => FloorMap.toDTO(floor)) as IFloorDTO[];
      return Result.ok<IFloorDTO[]>(floorDTOs);
    } catch (err) {
      throw err;
    }
  }

  public async getBuildingFloorMaxMin(max: number, min: number): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildings = await this.floorRepo.findBuildingByFloorMaxMin(max, min);
      if (buildings.length === 0) {
        return Result.fail<IBuildingDTO[]>("Couldn't find buildings with floors between " + min + ' and ' + max);
      }

      const buildingsOrError = [];

      for (const buildingId of buildings) {
        const building = await this.buildingRepo.findById(buildingId);
        buildingsOrError.push(building);
      }

      const buildingsDTOs = buildingsOrError.map((building: Building) => BuildingMap.toDTO(building)) as IBuildingDTO[];
      return Result.ok<IBuildingDTO[]>(buildingsDTOs);
    } catch (err) {
      throw err;
    }
  }

  public async updateBuildingFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      let floor = await this.floorRepo.findById(floorDTO.domainId);
      if (floor === null) {
        return Result.fail<IFloorDTO>('Floor not found');
      } else {
        floor.floorNr = floorDTO.floorNr;
        floor.description = floorDTO.description;

        try {
          floor = await this.floorRepo.save(floor);
        } catch (err) {
          return Result.fail<IFloorDTO>(err);
        }

        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async uploadFloorMap(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      let floor = (await this.floorRepo.findByBuildingIdAndFloorNr(floorDTO.building, floorDTO.floorNr));
      if (floor === null) {
        return Result.fail<IFloorDTO>('Floor not found');
      } else {
        //refactored to use value objects
        const floorMapStructure = await FloorMapStructure.create(floorDTO.floorMap);
        if (floorMapStructure.error) {
          return Result.fail<IFloorDTO>(floorMapStructure.error);
        }
        floor.floorMap = floorMapStructure.getValue();

        const validated = await this.validateSize(floor);
        if (!validated) {
          return Result.fail<IFloorDTO>("Floor size exceeds building size.");
        }

        try {
          floor = await this.floorRepo.updateOneWithFloorMap(floor);
        } catch (err) {
          return Result.fail<IFloorDTO>(err);
        }
        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  async validateSize(floor: Floor): Promise<boolean> {

    const buildingLength = floor.building.length;
    const floorDepth = floor.floorMap.props.floor.size.depth;
    const buildingWidth = floor.building.width;
    const floorWidth = floor.floorMap.props.floor.size.width;

    if (floorDepth > buildingLength || floorWidth > buildingWidth) {
      return false;
    }
    return true;

  }
  public async listFloorsWithPathways(buildingDesignation: string): Promise<Result<IFloorDTO[]>> {
    try {
      let building;
      const buildingOrError = await this.getBuildingByDesignation(buildingDesignation);
      if (buildingOrError.isFailure) {
        return Result.fail<IFloorDTO[]>(buildingOrError.error);
      } else {
        building = buildingOrError.getValue();
      }
      const pathways= await this.pathwayRepo.findByBuilding(building.id.toString());
      const floors= await this.floorRepo.floorsInPathway(pathways);
      if (floors.length === 0) {
        return Result.fail<IFloorDTO[]>("Couldn't find floors for building: " + buildingDesignation);
      }
    } catch (err) {
      throw err;
    }
  }
}
