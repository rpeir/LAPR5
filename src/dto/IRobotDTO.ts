import { TipoRobot } from "../domain/tipoRobot";
import { ITipoRobotDTO } from "./ITipoRobotDTO";

export interface IRobotDTO {
    nickName: string;
    tipoRobot: string;
    nrSerie: string;
    descricao: string;
}
