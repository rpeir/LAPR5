import Container from "typedi";
import { Mapper } from "../core/infra/Mapper";
import { TipoRobot } from "../domain/tipoRobot";
import { ITipoRobotDTO } from "../dto/ITipoRobotDTO";
import TipoTarefaRepo from "../repos/tipoTarefaRepo";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TipoTarefaMap } from "./TipoTarefaMap";

export class TipoRobotMap extends Mapper<TipoRobot>{

    public static toDTO( tipoRobot: TipoRobot): ITipoRobotDTO{
        return {
            name: tipoRobot.name,
            tipoTarefas: tipoRobot.tipoTarefas.map((tipoTarefa) => TipoTarefaMap.toDTO(tipoTarefa))
        } as ITipoRobotDTO;
    }
    
    public static async toDomain (raw: any): Promise<TipoRobot> {
        const tipoTarefaRepository = Container.get(TipoTarefaRepo);

        const tipoRobotOrError = TipoRobot.create({
            name: raw.name,
            tipoTarefas: raw.tipoTarefas.map((tipoTarefa) => TipoTarefaMap.toDomain(tipoTarefa))
        }, new UniqueEntityID(raw.domainId))

        tipoRobotOrError.isFailure ? console.log(tipoRobotOrError.error) : '';

        return tipoRobotOrError.isSuccess ? tipoRobotOrError.getValue() : null;
    }

    public static toPersistence (tipoRobot: TipoRobot): any{
        const a = {
            domainId: tipoRobot.id.toString(),
            tipoTarefas: tipoRobot.tipoTarefas.map((tipoTarefa) => TipoTarefaMap.toPersistence(tipoTarefa))
        }
        return a;
    }
}