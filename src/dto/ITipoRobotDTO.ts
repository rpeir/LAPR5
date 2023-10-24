import { TipoTarefa } from "../domain/tipoTarefa";

export interface ITipoRobotDTO {
  name: string,
  tipoTarefas: string[],
  modelo: string,
  marca: string
}
