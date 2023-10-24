import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { TipoRobotId } from "./tipoRobotId";
import { TipoTarefa } from "./tipoTarefa";
import { ModeloTipoRobot } from "./modeloTipoRobot";
import { MarcaTipoRobot } from "./marcaTipoRobot";
import { TipoRobotName } from "./tipoRobotName";

interface TipoRobotProps {
  name: TipoRobotName;
  tipoTarefas: TipoTarefa[];
  modelo: ModeloTipoRobot;
  marca: MarcaTipoRobot;
}

export class TipoRobot extends AggregateRoot<TipoRobotProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): TipoRobotName {
    return this.props.name;
  }

  get tipoTarefas(): TipoTarefa[] {
    return this.props.tipoTarefas;
  }

  get marca(): MarcaTipoRobot {
    return this.props.marca;
  }

  get modelo(): ModeloTipoRobot {
    return this.props.modelo;
  }

  private constructor(props: TipoRobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TipoRobotProps, id?: UniqueEntityID): Result<TipoRobot> {

    const guardedProps = [
      { argument: props.name, argumentName: "name" },
      { argument: props.tipoTarefas, argumentName: "tipoTarefas" },
      { argument: props.modelo, argumentName: "modelo"},
      { argument: props.marca, argumentName: "marca"}
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<TipoRobot>(guardResult.message);
    } else {
      const tipoRobot = new TipoRobot({ ...props }, id);

      return Result.ok<TipoRobot>(tipoRobot);
    }
  }

}
