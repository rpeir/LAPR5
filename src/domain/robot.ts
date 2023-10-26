import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { RobotDescription } from "./robotDescription";
import { RobotNickName } from "./robotNickName";
import { RobotSerialNr } from "./robotSerialNr";
import { RobotType } from "./robotType";
import { RobotCode } from "./robotCode";

interface RobotProps {
    robotCode: RobotCode;
    nickName: RobotNickName;
    robotType: RobotType;
    serialNr: RobotSerialNr;
    description: RobotDescription;
}

export class Robot extends AggregateRoot<RobotProps>{
    get id (): UniqueEntityID {
        return this._id;
    }

    get nickName(): RobotNickName{
        return this.props.nickName;
    }

    get robotType(): RobotType{
        return this.props.robotType;
    }

    get serialNr(): RobotSerialNr{
        return this.props.serialNr;
    }

    get description():RobotDescription{
        return this.props.description;
    }

    get robotCode(): RobotCode{
        return this.props.robotCode;
    }

    private constructor(props: RobotProps, id?: UniqueEntityID){
        super(props,id);
    }



    public static create (props: RobotProps, id?: UniqueEntityID): Result<Robot>{
        const guardedProps = [
            {argument: props.robotType, argumentName: 'robotType'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Robot>(guardResult.message);
        } else{
            const robot = new Robot({
                ...props
            },id);
            return Result.ok<Robot>(robot)
        }

    }

}
