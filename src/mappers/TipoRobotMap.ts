import Container from "typedi";
import { Mapper } from "../core/infra/Mapper";
import { TipoRobot } from "../domain/tipoRobot";
import { ITipoRobotDTO } from "../dto/ITipoRobotDTO";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TipoTarefa } from "../domain/tipoTarefa";
import { Result } from "../core/logic/Result";
import { MarcaTipoRobot } from "../domain/marcaTipoRobot";
import { ModeloTipoRobot } from "../domain/modeloTipoRobot";
import { TipoRobotName } from "../domain/tipoRobotName";

export class TipoRobotMap extends Mapper<TipoRobot> {

  public static toDTO(tipoRobot: TipoRobot): ITipoRobotDTO {
    return {
      name: tipoRobot.name.value,
      tipoTarefas: tipoRobot.tipoTarefas.map((tipoTarefa) => tipoTarefa.toString()),
      marca: tipoRobot.marca.value,
      modelo: tipoRobot.modelo.value
    } as ITipoRobotDTO;
  }

  public static async toDomain(raw: any): Promise<TipoRobot> {
    const marcaTipoRobotOrError = MarcaTipoRobot.create(raw.marca);
    const modeloTipoRobotOrError = ModeloTipoRobot.create(raw.modelo);
    const nameTipoRobotOrError = TipoRobotName.create(raw.name);
    const tipoRobotOrError = TipoRobot.create({
      name: nameTipoRobotOrError.getValue(),
      tipoTarefas: raw.tipoTarefas.map((tipoTarefa) => {
        return tipoTarefa as TipoTarefa;
      }),
      modelo: modeloTipoRobotOrError.getValue(),
      marca: marcaTipoRobotOrError.getValue()
    }, new UniqueEntityID(raw.domainId));

    tipoRobotOrError.isFailure ? console.log(tipoRobotOrError.error) : "";

    return tipoRobotOrError.isSuccess ? tipoRobotOrError.getValue() : null;
  }

  public static toPersistence(tipoRobot: TipoRobot): any {
    const a = {
      domainId: tipoRobot.id.toString(),
      name: tipoRobot.name.value,
      tipoTarefas: tipoRobot.tipoTarefas.map((tipoTarefa) => tipoTarefa.toString()),
      modelo: tipoRobot.modelo.toString(),
      marca: tipoRobot.marca.value
    };
    return a;
  }
}
