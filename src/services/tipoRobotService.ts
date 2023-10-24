import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import { ITipoRobotDTO } from "../dto/ITipoRobotDTO";
import ITipoRobotService from "./IServices/ITipoRobotService";

import ITipoRobotRepo from "./IRepos/ITipoRobotRepo";
import config from "../../config";
import { TipoRobot } from "../domain/tipoRobot";
import { TipoRobotMap } from "../mappers/TipoRobotMap";
import { TipoTarefa } from "../domain/tipoTarefa";
import { TipoRobotName } from "../domain/tipoRobotName";
import { MarcaTipoRobot } from "../domain/marcaTipoRobot";
import { ModeloTipoRobot } from "../domain/modeloTipoRobot";

@Service()
export default class TipoRobotService implements ITipoRobotService {
  constructor(
    @Inject(config.repos.tipoRobot.name) private tipoRobotRepo: ITipoRobotRepo
  ) {
  }

  public async createTipoRobot(tipoRobotDTO: ITipoRobotDTO): Promise<Result<ITipoRobotDTO>> {
    try {
      const tipoRobotName = TipoRobotName.create(tipoRobotDTO.name).getValue();
      const marcaTipoRobot = MarcaTipoRobot.create(tipoRobotDTO.marca).getValue();
      const modeloTipoRobot = ModeloTipoRobot.create(tipoRobotDTO.modelo).getValue();

      for (const tipoTarefa of tipoRobotDTO.tipoTarefas) {
        const tarefaOrError = await this.validateTipoTarefa(tipoTarefa);
        if (tarefaOrError.isFailure) {
          return Result.fail<ITipoRobotDTO>(tarefaOrError.error);
        }
      }


      const tipoRobotOrError = TipoRobot.create({
          name: tipoRobotName,
          modelo: modeloTipoRobot,
          marca: marcaTipoRobot,
          tipoTarefas: tipoRobotDTO.tipoTarefas.map((tarefa) => tarefa as TipoTarefa)
        }
      );

      if (tipoRobotOrError.isFailure) {
        throw Result.fail<ITipoRobotDTO>(tipoRobotOrError.errorValue());
      }
      const tipoRobotResult = tipoRobotOrError.getValue();

      await this.tipoRobotRepo.save(tipoRobotResult);
      const tipoRobotDTOResult = TipoRobotMap.toDTO(tipoRobotResult) as ITipoRobotDTO;
      return Result.ok<ITipoRobotDTO>(tipoRobotDTOResult);
    } catch (err) {
      throw err;
    }
  }

  private async validateTipoTarefa(tipoTarefa: string) {
    for (const key in TipoTarefa) {
      if (TipoTarefa[key].toLowerCase() === tipoTarefa.toLowerCase()) {
        return Result.ok<TipoTarefa>(tipoTarefa as TipoTarefa);
      }
    }
    return Result.fail<TipoTarefa>("Tarefa: " + tipoTarefa + " nao suportada");
  }

}
