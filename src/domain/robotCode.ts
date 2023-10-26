import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RobotCodeProps {
    value: string;
}

export class RobotCode extends ValueObject<RobotCodeProps>{
  get value(): string{
    return this.props.value;
  }

  private constructor(props: RobotCodeProps){
    super(props);
  }

  public static create (robotCode: string): Result<RobotCode>{
    const guardNull = Guard.againstNullOrUndefined(robotCode,"robotCode");
    const guardLength = Guard.inRange(robotCode.length,1,250,"robotCodeLength");
    const guardResult = Guard.combine([guardLength,guardNull]);
    if(!guardResult.succeeded){
      return Result.fail<RobotCode>(guardResult.message);
    } else{
      return Result.ok<RobotCode>(new RobotCode({value : robotCode}))
    }

  }
}
