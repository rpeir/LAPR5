import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface RobotSerialNrProps{
    value: string;
}

export class RobotSerialNr extends ValueObject<RobotSerialNrProps>{
    get value(): string{
        return this.props.value;
    }

    private constructor(props: RobotSerialNrProps){
        super(props);
    }

    public static create (robotSerialNr: string): Result<RobotSerialNr>{
        const guardNull = Guard.againstNullOrUndefined(robotSerialNr,"robotSerialNr");
        const guardLength = Guard.inRange(robotSerialNr.length,1,50,"robotSerialNrLenght");
        const guardResult = Guard.combine([guardLength,guardNull]);
        if(!guardResult.succeeded){
            return Result.fail<RobotSerialNr>(guardResult.message);
        } else{
            return Result.ok<RobotSerialNr>(new RobotSerialNr({value : robotSerialNr}))
        }
    }
}
