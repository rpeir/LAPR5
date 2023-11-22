import IFloorService from "./IServices/IFloorService";
import { IFloorDTO } from "../dto/IFloorDTO";
import { Result } from "../core/logic/Result";
import { Inject, Service } from "typedi";
import config from "../../config";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import { Building } from "../domain/building/building";
import { Floor } from "../domain/floor/floor";
import { FloorMapper } from "../mappers/FloorMapper";
import { IBuildingDTO } from "../dto/IBuildingDTO";
import { BuildingMap } from "../mappers/BuildingMap";
import { FloorMapStructure } from "../domain/floor/floorMapStructure";
import IPathwayRepo from "./IRepos/IPathwayRepo";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.pathway.name) private pathwayRepo: IPathwayRepo
  ) {
  }

  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      let building;
      const buildingOrError = await this.getBuildingByDesignation(floorDTO.building);
      if (buildingOrError.isFailure) {
        return Result.fail<IFloorDTO>(buildingOrError);
      } else {
        building = buildingOrError.getValue();
      }

      let id;
      if (floorDTO.domainId === null) {
        id = floorDTO.domainId;
      } else {
        id = new UniqueEntityID();
      }
      const floorOrError = Floor.create(
        {
          description: floorDTO.description,
          floorNr: floorDTO.floorNr,
          building: building
        },
        id
      );

      if (floorOrError.isFailure) {
        return Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

      let floorResult = floorOrError.getValue();
      try {
        floorResult = await this.floorRepo.save(floorResult);
      } catch (err) {
        return Result.fail<IFloorDTO>(err.message);
      }

      const floorDTOResult = FloorMapper.toDTO(floorResult) as IFloorDTO;
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
      const floorDTOs = floors.map(floor => FloorMapper.toDTO(floor)) as IFloorDTO[];
      return Result.ok<IFloorDTO[]>(floorDTOs);
    } catch (err) {
      throw err;
    }
  }

  public async getBuildingFloorMaxMin(max: number, min: number): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildings = await this.floorRepo.findBuildingByFloorMaxMin(max, min);
      if (buildings.length === 0) {
        return Result.fail<IBuildingDTO[]>("Couldn't find buildings with floors between " + min + " and " + max);
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
        return Result.fail<IFloorDTO>("Floor not found");
      }
      floor.updateDescriptionAndFloorNr(floorDTO.description, floorDTO.floorNr);

      try {
        floor = await this.floorRepo.save(floor);
      } catch (err) {
        return Result.fail<IFloorDTO>(err);
      }

      const floorDTOResult = FloorMapper.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);

    } catch (e) {
      throw e;
    }
  }

  public async listFloorsWithPathways(buildingDesignation: string): Promise<Result<Map<number, IFloorDTO[]>>> {
    try {
      let building;
      const buildingOrError = await this.getBuildingByDesignation(buildingDesignation);
      if (buildingOrError.isFailure) {
        return Result.fail(buildingOrError.error);
      } else {
        building = buildingOrError.getValue();
      }
      const pathways = await this.pathwayRepo.findByBuildingId(building.id.toString());

      // map that for each floor of the building we want to list, has a list of reachable floors
      const floors: Map<number, Floor[]> = new Map<number, Floor[]>();
      pathways.map(pathway => {
        // if the building that we are trying to list is the source building of the pathway
        let originFloor, destinationFloor: Floor;
        if (pathway.buildingSource.id.equals(building.id)) {
          originFloor = pathway.floorSource;
          destinationFloor = pathway.floorDestination;
        } else {
          // if the building that we are trying to list is the destination building of the pathway
          originFloor = pathway.floorDestination;
          destinationFloor = pathway.floorSource;
        }

        // if the origin floor is not in the map, add it
        if (!floors.has(originFloor.floorNr)) {
          floors.set(originFloor.floorNr, []);
        }

        // if the destination floor is not in the list of reachable floors of the origin floor, add it
        if (!floors.get(originFloor.floorNr).includes(destinationFloor)) {
          floors.get(originFloor.floorNr).push(destinationFloor);
        }
      });

      if (floors.size === 0) {
        return Result.fail("Couldn't find floors for building: " + buildingDesignation);
      }
      try {
        const floorsDTOs: Map<number, IFloorDTO[]> = new Map<number, IFloorDTO[]>();
        floors.forEach((value, key) => {
          floorsDTOs.set(
            key,
            value.map(floor => FloorMapper.toDTO(floor))
          );
        });
        return Result.ok<Map<number, IFloorDTO[]>>(floorsDTOs);
      } catch (err) {
        return Result.fail(err);
      }
    } catch (err) {
      throw err;
    }
  }

  public async uploadFloorMap(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      let floor = await this.floorRepo.findByBuildingIdAndFloorNr(floorDTO.building, floorDTO.floorNr);
      if (floor === null) {
        return Result.fail<IFloorDTO>("Floor not found");
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
        const floorDTOResult = FloorMapper.toDTO(floor) as IFloorDTO;
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  async validateSize(floor: Floor): Promise<boolean> {
    const buildingLength = floor.building.length;
    const floorDepth = floor.floorMap.props.maze.size.depth;
    const buildingWidth = floor.building.width;
    const floorWidth = floor.floorMap.props.maze.size.width;

    if (floorDepth > buildingLength || floorWidth > buildingWidth) {
      return false;
    }
    return true;
  }


  public async findByBuildingIdAndFloorNr(buildingId: string, floorNr: number) {
    const floor = await this.floorRepo.findByBuildingIdAndFloorNr(buildingId, floorNr);
    if (floor === null) {
      return Result.fail<IFloorDTO>("Couldn't find floor for buildingId: " + buildingId + " and floorNr: " + floorNr);
    }
    return Result.ok<IFloorDTO>(FloorMapper.toDTO(floor));
  }
}
