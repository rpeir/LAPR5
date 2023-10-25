import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IBuildingService from "./IServices/IBuildingService";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {Building} from "../domain/building";
import {BuildingCode} from "../domain/BuildingCode";
import {BuildingMap} from "../mappers/BuildingMap";

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.building.name) private  buildingRepo: IBuildingRepo
  ) {
  }

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const buildingCode=BuildingCode.create(buildingDTO.code).getValue();
      const buildingDesignation = buildingDTO.designation;
      const buildingDescription=buildingDTO.description;
      const buildingLength=buildingDTO.length;
      const buildingWidth=buildingDTO.width;
      const buildingHeight=buildingDTO.height;
      ;



      const buildingOrError = Building.create({
        code: buildingCode,
        designation: buildingDesignation,
        description: buildingDescription,
        length: buildingLength,
        width: buildingWidth,
        height: buildingHeight,

        }
      );

      if (buildingOrError.isFailure) {
        throw Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }
      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);
      const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);
    } catch (err) {
      throw err;
    }
  }


}
