import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RobotDescriptionProps{
    value: string;
}

export class RobotDescription extends ValueObject<RobotDescriptionProps>{
    get value(): string{
        return this.props.value;
    }

    private constructor(props: RobotDescriptionProps){
        super(props);
    }

    public static create (robotDescription: string): Result<RobotDescription>{
        const guardNull = Guard.againstNullOrUndefined(robotDescription,"robotDescription");
        const guardLength = Guard.inRange(robotDescription.length,1,250,"robotDescriptionLength");
        const guardResult = Guard.combine([guardLength,guardNull]);
        if(!guardResult.succeeded){
            return Result.fail<RobotDescription>(guardResult.message);
        } else{
            return Result.ok<RobotDescription>(new RobotDescription({value : robotDescription}))
        }
    }
}
