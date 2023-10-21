import { ITipoTarefaPersistence } from "./ITipoTarefaPersistence";

export interface ITipoRobotPersistence {
    domainId: string;
    name: string;
    tipoTarefas: ITipoTarefaPersistence[];
}