import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TipoRobotNameProps{
  value: string;
}

export class TipoRobotName extends ValueObject<TipoRobotNameProps>{
  get value(): string{
    return this.props.value;
  }

  private constructor(props: TipoRobotNameProps){
    super(props);
  }

  public static create (tipoRobotName: string): Result<TipoRobotName>{
    const guardNull = Guard.againstNullOrUndefined(tipoRobotName,"tipoRobotName");
    const guardLength = Guard.inRange(tipoRobotName.length,1,25,"tipoRobotNameLength");
    const guardResult = Guard.combine([guardLength,guardNull]);
    if(!guardResult.succeeded){
      return Result.fail<TipoRobotName>(guardResult.message);
    } else{
      return Result.ok<TipoRobotName>(new TipoRobotName({value : tipoRobotName}))
    }
  }
}
