import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import { ITipoRobotDTO } from "../dto/ITipoRobotDTO";
import ITipoRobotService from "./IServices/ITipoRobotService";

import ITipoRobotRepo from "./IRepos/ITipoRobotRepo";
import config from "../../config";
import ITipoTarefaRepo from "./IRepos/ITipoTarefaRepo";
import { TipoRobot } from "../domain/tipoRobot";
import { TipoTarefaMap } from "../mappers/TipoTarefaMap";
import { TipoRobotMap } from "../mappers/TipoRobotMap";

@Service()
export default class TipoRobotService implements ITipoRobotService{
    constructor(
        @Inject(config.repos.tipoRobot.name) private tipoRobotRepo: ITipoRobotRepo,
        @Inject(config.repos.tipoTarefa.name) private tipoTarefaRepo: ITipoTarefaRepo
    ){}
    
    public async createTipoRobot(tipoRobotDTO: ITipoRobotDTO): Promise<Result<ITipoRobotDTO>> {
        try {
            const tipoRobotOrError = await TipoRobot.create({
                name: tipoRobotDTO.name,
                tipoTarefas: tipoRobotDTO.tipoTarefas.map((tipoTarefa) => TipoTarefaMap.toDomain(tipoTarefa))}
                
            );
            
            if (tipoRobotOrError.isFailure) {
                throw Result.fail<ITipoRobotDTO>(tipoRobotOrError.errorValue());
            }
            const tipoRobotResult = tipoRobotOrError.getValue();

            await this.tipoRobotRepo.save(tipoRobotResult);
            const tipoRobotDTOResult = TipoRobotMap.toDTO( tipoRobotResult) as ITipoRobotDTO;
            return Result.ok<ITipoRobotDTO>(tipoRobotDTOResult)
        } catch (err) {
            throw err;
        }
    }
    
}