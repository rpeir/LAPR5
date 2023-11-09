import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface RobotNickNameProps{
    value: string;
}

export class RobotNickName extends ValueObject<RobotNickNameProps>{
    get value(): string{
        return this.props.value;
    }

    private constructor(props: RobotNickNameProps){
        super(props);
    }

    public static create (robotNickName: string): Result<RobotNickName>{
        const guardNull = Guard.againstNullOrUndefined(robotNickName,"robotNickName");
        const length = robotNickName.length;
        const guardLength = Guard.inRange(length,1,30,"robotNickNameLength");
        const guardResult = Guard.combine([guardLength,guardNull]);
        if(!guardResult.succeeded){
            return Result.fail<RobotNickName>(guardResult.message);
        } else{
            return Result.ok<RobotNickName>(new RobotNickName({value : robotNickName}))
        }
    }
}
