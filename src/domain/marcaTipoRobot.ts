import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface MarcaTipoRobotProps{
  value: string;
}

export class MarcaTipoRobot extends ValueObject<MarcaTipoRobotProps>{
  get value(): string{
    return this.props.value;
  }

  private constructor(props: MarcaTipoRobotProps){
    super(props);
  }

  public static create (marcaTipoRobot: string): Result<MarcaTipoRobot>{
    const guardNull = Guard.againstNullOrUndefined(marcaTipoRobot,"marcaTipoRobot");
    const guardLength = Guard.inRange(marcaTipoRobot.length,1,25,"marcaTipoRobotLength");
    const guardResult = Guard.combine([guardLength,guardNull]);
    if(!guardResult.succeeded){
      return Result.fail<MarcaTipoRobot>(guardResult.message);
    } else{
      return Result.ok<MarcaTipoRobot>(new MarcaTipoRobot({value : marcaTipoRobot}))
    }
  }
}
