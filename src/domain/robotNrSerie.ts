import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RobotNrSerieProps{
    value: string;
}

export class RobotNrSerie extends ValueObject<RobotNrSerieProps>{
    get value(): string{
        return this.props.value;
    }

    private constructor(props: RobotNrSerieProps){
        super(props);
    }

    public static create (robotNrSerie: string): Result<RobotNrSerie>{
        const guardNull = Guard.againstNullOrUndefined(robotNrSerie,"robotNrSerie");
        const guardLength = Guard.inRange(robotNrSerie.length,1,50,"robotNrSerieLenght");
        const guardResult = Guard.combine([guardLength,guardNull]);
        if(!guardResult.succeeded){
            return Result.fail<RobotNrSerie>(guardResult.message);
        } else{
            return Result.ok<RobotNrSerie>(new RobotNrSerie({value : robotNrSerie}))
        }
    }
}
