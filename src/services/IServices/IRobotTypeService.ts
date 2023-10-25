import { Result } from "../../core/logic/Result";
import { IRobotType } from "../../dto/IRobotType";

export default interface IRobotTypeService {
    createRobotType(robotType: IRobotType): Promise<Result<IRobotType>>;
}
