import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IBuildingService from "./IServices/IBuildingService";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import { IBuildingDTO } from "../dto/IBuildingDTO";
import { Building } from "../domain/building/building";
import { BuildingCode } from "../domain/building/BuildingCode";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingService implements IBuildingService {
  constructor(@Inject(config.repos.building.name) private buildingRepo: IBuildingRepo) {
  }

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const rawBuildingCode = BuildingCode.create(buildingDTO.code);
      if (rawBuildingCode.isFailure) {
        return Result.fail<IBuildingDTO>(rawBuildingCode.errorValue());
      }
      const buildingCode = rawBuildingCode.getValue();
      const buildingDesignation = buildingDTO.designation;
      const buildingDescription = buildingDTO.description;
      const buildingLength = buildingDTO.length;
      const buildingWidth = buildingDTO.width;
      const buildingHeight = buildingDTO.height;

      const buildingOrError = Building.create({
        code: buildingCode,
        designation: buildingDesignation,
        description: buildingDescription,
        length: buildingLength,
        width: buildingWidth,
        height: buildingHeight
      });

      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }
      const buildingResult = buildingOrError.getValue();
      try {
        await this.buildingRepo.save(buildingResult);
      } catch (error) {
        return Result.fail<IBuildingDTO>(error);
      }
      const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);

    } catch (err) {
      throw err;
    }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingDTO.code);
      // Check if the building was found
      if (building === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      }
      // Update the fields that have changed and are not null
      for (const key in buildingDTO) {
        if (buildingDTO[key] !== building[key] && buildingDTO[key] !== null) {
          building[key] = buildingDTO[key];
        }
      }
      // Save the updated building
      await this.buildingRepo.updateOne(building);
      // Return the updated DTO
      const updatedBuildingDTO = BuildingMap.toDTO(building) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(updatedBuildingDTO);
    } catch (err) {
      // You can log the error here if needed
      throw err;
    }
  }

  public async listAllBuilding(): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildings = await this.buildingRepo.findAll();
      const buildingsDTO: IBuildingDTO[] = [];
      for (const buildingPromise of buildings) {
        // Use await to get the resolved value of the Promise
        const building = await buildingPromise;
        if (building) {
          buildingsDTO.push(BuildingMap.toDTO(building) as IBuildingDTO);
        }
      }
      return Result.ok<IBuildingDTO[]>(buildingsDTO);
    } catch (error) {
      throw error;
    }
  }

  public async getBuildingByDesignation(buildingDesignation: string): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDesignation(buildingDesignation);
      if (building === null) {
        return Result.fail<IBuildingDTO>("Building " + buildingDesignation + "not found");
      }
      const buildingDTO = BuildingMap.toDTO(building) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTO);
    } catch (error) {
      throw error;
    }
  }

}
