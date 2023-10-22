import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { TipoRobotId } from "./tipoRobotId";
import { TipoTarefa } from "./tipoTarefa";

interface TipoRobotProps {
    name: string;
    tipoTarefas: TipoTarefa[];
}

export class TipoRobot extends AggregateRoot<TipoRobotProps>{
  get id (): UniqueEntityID {
    return this._id;
  }    
  get tipoRobotId (): TipoRobotId {
    return TipoRobotId.caller(this.id)
  }

  get name(): string {
    return this.props.name;
  }

  get tipoTarefas(): TipoTarefa[] {
    return this.props.tipoTarefas;
  }

  set tipoTarefas(value: TipoTarefa[]){
    this.props.tipoTarefas = value;
  }

  private constructor(props: TipoRobotProps, id?: UniqueEntityID){
    super(props, id);
  }

  public static create (props: TipoRobotProps, id?: UniqueEntityID): Result<TipoRobot> {

    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.tipoTarefas, argumentName: 'tipoTarefas'}
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if(!guardResult.succeeded){
      return Result.fail<TipoRobot>(guardResult.message)
    } else{
      const tipoRobot = new TipoRobot({...props}, id);

      return Result.ok<TipoRobot>(tipoRobot);
    }
  }

}