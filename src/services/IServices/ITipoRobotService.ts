import { Result } from "../../core/logic/Result";
import { ITipoRobotDTO } from "../../dto/ITipoRobotDTO";

export default interface ITipoRobotService {
    createTipoRobot(tipoRobotDTO: ITipoRobotDTO): Promise<Result<ITipoRobotDTO>>;
}