import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RobotDescricaoProps{
    value: string;
}

export class RobotDescricao extends ValueObject<RobotDescricaoProps>{
    get value(): string{
        return this.props.value;
    }

    private constructor(props: RobotDescricaoProps){
        super(props);
    }

    public static create (robotDescricao: string): Result<RobotDescricao>{
        const guardNull = Guard.againstNullOrUndefined(robotDescricao,"robotDescricao");
        const guardLength = Guard.inRange(robotDescricao.length,1,250,"robotDescricaoLength");
        const guardResult = Guard.combine([guardLength,guardNull]);
        if(!guardResult.succeeded){
            return Result.fail<RobotDescricao>(guardResult.message);
        } else{
            return Result.ok<RobotDescricao>(new RobotDescricao({value : robotDescricao}))
        }
    }
}