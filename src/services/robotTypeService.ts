import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import { IRobotTypeDTO } from "../dto/IRobotTypeDTO";
import IRobotTypeService from "./IServices/IRobotTypeService";

import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";
import config from "../../config";
import { RobotType } from "../domain/robotType/robotType";
import { RobotTypeMap } from "../mappers/RobotTypeMap";
import { TaskType } from "../domain/task/taskType";
import { RobotTypeName } from "../domain/robotType/robotTypeName";
import { RobotTypeBrand } from "../domain/robotType/robotTypeBrand";
import { RobotTypeModel } from "../domain/robotType/robotTypeModel";

@Service()
export default class RobotTypeService implements IRobotTypeService {
  constructor(
    @Inject(config.repos.robotType.name) private robotTypeRepo: IRobotTypeRepo
  ) {
  }

  public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
    try {
      const robotTypeName = RobotTypeName.create(robotTypeDTO.name).getValue();
      const robotTypeBrand = RobotTypeBrand.create(robotTypeDTO.brand).getValue();
      const robotTypeModel = RobotTypeModel.create(robotTypeDTO.robotTypeModel).getValue();

      for (const taskType of robotTypeDTO.taskTypes) {
        const taskTypeOrError = await this.validateTaskType(taskType);
        if (taskTypeOrError.isFailure) {
          return Result.fail<IRobotTypeDTO>(taskTypeOrError.error);
        }
      }


      const robotTypeOrError = RobotType.create({
          name: robotTypeName,
          robotTypeModel: robotTypeModel,
          brand: robotTypeBrand,
          taskTypes: robotTypeDTO.taskTypes.map((taskType) => taskType as TaskType)
        }
      );

      if (robotTypeOrError.isFailure) {
        return  Result.fail<IRobotTypeDTO>(robotTypeOrError.errorValue());
      }

      let robotTypeResult = robotTypeOrError.getValue();
      try {
        robotTypeResult = await this.robotTypeRepo.save(robotTypeResult);
      }catch (err){
        return Result.fail<IRobotTypeDTO>(err.message);
      }

      const robotTypeResultDTO = RobotTypeMap.toDTO(robotTypeResult) as IRobotTypeDTO;
      return Result.ok<IRobotTypeDTO>(robotTypeResultDTO);
    } catch (err) {
      throw err;
    }
  }

  private async validateTaskType(taskType: string) {
    for (const key in TaskType) {
      if (TaskType[key].toLowerCase() === taskType.toLowerCase()) {
        return Result.ok<TaskType>(taskType as TaskType);
      }
    }
    return Result.fail<TaskType>("Task: " + taskType + " not supported.");
  }

}
