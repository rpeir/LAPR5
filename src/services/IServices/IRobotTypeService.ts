import { Result } from "../../core/logic/Result";
import { IRobotTypeDTO } from "../../dto/IRobotTypeDTO";

export default interface IRobotTypeService {
    createRobotType(robotType: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
}
