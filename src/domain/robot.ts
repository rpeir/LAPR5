import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { RobotDescricao } from "./robotDescricao";
import { RobotNickName } from "./robotNickName";
import { RobotNrSerie } from "./robotNrSerie";
import { TipoRobot } from "./tipoRobot";

interface RobotProps {
    nickName: RobotNickName;
    tipoRobot: TipoRobot;
    nrSerie: RobotNrSerie;
    descricao: RobotDescricao;
}

export class Robot extends AggregateRoot<RobotProps>{
    get id (): UniqueEntityID {
        return this._id;
    }

    get nickName(): RobotNickName{
        return this.props.nickName;
    }

    get tipoRobot(): TipoRobot{
        return this.props.tipoRobot;
    }

    get nrSerie(): RobotNrSerie{
        return this.props.nrSerie;
    }

    get descricao():RobotDescricao{
        return this.props.descricao;
    }

    private constructor(props: RobotProps, id?: UniqueEntityID){
        super(props,id);
    }



    public static create (props: RobotProps, id?: UniqueEntityID): Result<Robot>{
        const guardedProps = [
            {argument: props.tipoRobot, argumentName: 'tipoRobot'}
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
