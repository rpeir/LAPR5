import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface ModeloTipoRobotProps{
  value: string;
}

export class ModeloTipoRobot extends ValueObject<ModeloTipoRobotProps>{
  get value(): string{
    return this.props.value;
  }

  private constructor(props: ModeloTipoRobotProps){
    super(props);
  }

    public static create (modeloTipoRobot: string): Result<ModeloTipoRobot>{
    const guardNull = Guard.againstNullOrUndefined(modeloTipoRobot,"modeloTipoRobot");
    const guardLength = Guard.inRange(modeloTipoRobot.length,1,100,"modeloTipoRobotLength");
    const guardResult = Guard.combine([guardLength,guardNull]);
    if(!guardResult.succeeded){
      return Result.fail<ModeloTipoRobot>(guardResult.message);
    } else{
      return Result.ok<ModeloTipoRobot>(new ModeloTipoRobot({value : modeloTipoRobot}))
    }
  }
}
