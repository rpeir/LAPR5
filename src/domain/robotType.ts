import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { RobotTypeID } from "./robotTypeID";
import { TaskType } from "./taskType";
import { RobotTypeModel } from "./robotTypeModel";
import { RobotTypeBrand } from "./robotTypeBrand";
import { RobotTypeName } from "./robotTypeName";

interface RobotTypeProps {
  name: RobotTypeName;
  taskTypes: TaskType[];
  robotTypeModel: RobotTypeModel;
  brand: RobotTypeBrand;
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): RobotTypeName {
    return this.props.name;
  }

  get taskTypes(): TaskType[] {
    return this.props.taskTypes;
  }

  get brand(): RobotTypeBrand {
    return this.props.brand;
  }

  get robotTypeModel(): RobotTypeModel {
    return this.props.robotTypeModel;
  }

  private constructor(props: RobotTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {

    const guardedProps = [
      { argument: props.name, argumentName: "name" },
      { argument: props.taskTypes, argumentName: "taskTypes" },
      { argument: props.robotTypeModel, argumentName: "robotTypeModel"},
      { argument: props.brand, argumentName: "brand"}
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<RobotType>(guardResult.message);
    } else {
      const robotType = new RobotType({ ...props }, id);

      return Result.ok<RobotType>(robotType);
    }
  }

}
