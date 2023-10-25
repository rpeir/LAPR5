import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface RobotTypeBrandProps{
    value: string;
  }

export class RobotTypeBrand extends ValueObject<RobotTypeBrandProps>{
  get value(): string{
    return this.props.value;
  }

  private constructor(props: RobotTypeBrandProps){
    super(props);
  }

  public static create (robotTYpeBrand: string): Result<RobotTypeBrand>{
    const guardNull = Guard.againstNullOrUndefined(robotTYpeBrand,"robotTYpeBrand");
    const guardLength = Guard.inRange(robotTYpeBrand.length,1,25,"robotTYpeBrandLength");
    const guardResult = Guard.combine([guardLength,guardNull]);
    if(!guardResult.succeeded){
      return Result.fail<RobotTypeBrand>(guardResult.message);
    } else{
      return Result.ok<RobotTypeBrand>(new RobotTypeBrand({value : robotTYpeBrand}))
    }
  }
}
