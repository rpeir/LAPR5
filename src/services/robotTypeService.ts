import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import { IRobotType } from "../dto/IRobotType";
import IRobotTypeService from "./IServices/IRobotTypeService";

import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";
import config from "../../config";
import { RobotType } from "../domain/robotType";
import { RobotTypeMap } from "../mappers/RobotTypeMap";
import { TaskType } from "../domain/taskType";
import { RobotTypeName } from "../domain/robotTypeName";
import { RobotTypeBrand } from "../domain/robotTypeBrand";
import { RobotTypeModel } from "../domain/robotTypeModel";

@Service()
export default class RobotTypeService implements IRobotTypeService {
  constructor(
    @Inject(config.repos.robotType.name) private robotTypeRepo: IRobotTypeRepo
  ) {
  }

  public async createRobotType(robotType: IRobotType): Promise<Result<IRobotType>> {
    try {
      const robotTypeName = RobotTypeName.create(robotType.name).getValue();
      const robotTypeBrand = RobotTypeBrand.create(robotType.brand).getValue();
      const robotTypeModel = RobotTypeModel.create(robotType.robotTypeModel).getValue();

      for (const taskType of robotType.taskTypes) {
        const taskTypeOrError = await this.validateTaskType(taskType);
        if (taskTypeOrError.isFailure) {
          return Result.fail<IRobotType>(taskTypeOrError.error);
        }
      }


      const robotTypeOrError = RobotType.create({
          name: robotTypeName,
          robotTypeModel: robotTypeModel,
          brand: robotTypeBrand,
          taskTypes: robotType.taskTypes.map((taskType) => taskType as TaskType)
        }
      );

      if (robotTypeOrError.isFailure) {
        return  Result.fail<IRobotType>(robotTypeOrError.errorValue());
      }

      let robotTypeResult = robotTypeOrError.getValue();
      try {
        robotTypeResult = await this.robotTypeRepo.save(robotTypeResult);
      }catch (err){
        return Result.fail<IRobotType>(err.message);
      }

      const robotTypeResultDTO = RobotTypeMap.toDTO(robotTypeResult) as IRobotType;
      return Result.ok<IRobotType>(robotTypeResultDTO);
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
