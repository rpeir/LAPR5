import { Mapper } from "../core/infra/Mapper";
import { RobotType } from "../domain/robotType/robotType";
import { IRobotTypeDTO } from "../dto/IRobotTypeDTO";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TaskType } from "../domain/taskType/taskType";
import { RobotTypeBrand } from "../domain/robotType/robotTypeBrand";
import { RobotTypeModel } from "../domain/robotType/robotTypeModel";
import { RobotTypeName } from "../domain/robotType/robotTypeName";

export class RobotTypeMap extends Mapper<RobotType> {

  public static toDTO(robotType: RobotType): IRobotTypeDTO {
    return {
      id: robotType.id.toString(),
      name: robotType.name.value,
      taskTypes: robotType.taskTypes.map((taskType) => taskType.toString()),
      brand: robotType.brand.value,
      robotTypeModel: robotType.robotTypeModel.value
    } as IRobotTypeDTO;
  }

  public static async toDomain(raw: any): Promise<RobotType> {
    const brandTypeRobotOrError = RobotTypeBrand.create(raw.brand);
    const modelTypeRobotOrError = RobotTypeModel.create(raw.robotTypeModel);
    const nameRobotTypeOrError = RobotTypeName.create(raw.name);
    const robotTypeOrError = RobotType.create({
      name: nameRobotTypeOrError.getValue(),
      taskTypes: raw.taskTypes.map((taskType) => {
        return taskType as TaskType;
      }),
      robotTypeModel: modelTypeRobotOrError.getValue(),
      brand: brandTypeRobotOrError.getValue()
    }, new UniqueEntityID(raw.domainId));

    robotTypeOrError.isFailure ? console.log(robotTypeOrError.error) : "";

    return robotTypeOrError.isSuccess ? robotTypeOrError.getValue() : null;
  }

  public static toPersistence(robotType: RobotType): any {
    const a = {
      domainId: robotType.id.toString(),
      name: robotType.name.value,
      taskTypes: robotType.taskTypes.map((taskType) => taskType.toString()),
      robotTypeModel: robotType.robotTypeModel.value,
      brand: robotType.brand.value
    };
    return a;
  }
}
