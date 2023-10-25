import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface RobotTypeNameProps{
  value: string;
}

export class RobotTypeName extends ValueObject<RobotTypeNameProps>{
  get value(): string{
    return this.props.value;
  }

  private constructor(props: RobotTypeNameProps){
    super(props);
  }

  public static create (robotTypeName: string): Result<RobotTypeName>{
    const guardNull = Guard.againstNullOrUndefined(robotTypeName,"robotTypeName");
    const guardLength = Guard.inRange(robotTypeName.length,1,25,"robotTypeNameLength");
    const guardResult = Guard.combine([guardLength,guardNull]);
    if(!guardResult.succeeded){
      return Result.fail<RobotTypeName>(guardResult.message);
    } else{
      return Result.ok<RobotTypeName>(new RobotTypeName({value : robotTypeName}))
    }
  }
}
