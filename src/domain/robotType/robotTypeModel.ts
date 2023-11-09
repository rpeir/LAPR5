import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotTypeModelProps{
  value: string;
}

export class RobotTypeModel extends ValueObject<RobotTypeModelProps>{
  get value(): string{
    return this.props.value;
  }

  private constructor(props: RobotTypeModelProps){
    super(props);
  }

    public static create (robotTypeModel: string): Result<RobotTypeModel>{
    const guardNull = Guard.againstNullOrUndefined(robotTypeModel,"robotTypeModel");
    const guardLength = Guard.inRange(robotTypeModel.length,1,100,"robotTypeModelLength");
    const guardResult = Guard.combine([guardLength,guardNull]);
    if(!guardResult.succeeded){
      return Result.fail<RobotTypeModel>(guardResult.message);
    } else{
      return Result.ok<RobotTypeModel>(new RobotTypeModel({value : robotTypeModel}))
    }
  }
}
