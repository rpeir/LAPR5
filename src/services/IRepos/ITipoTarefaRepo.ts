import { Repo } from "../../core/infra/Repo";
import { TipoTarefa } from "../../domain/tipoTarefa";
import { TipoTarefaId } from "../../domain/tipoTarefaId";

export default interface ITipoTarefaRepo extends Repo<TipoTarefa> {
    save(tipoTarefa: TipoTarefa): Promise<TipoTarefa>;
    findByDomainId (tipoTarefaId: TipoTarefaId | string): Promise<TipoTarefa>;
}