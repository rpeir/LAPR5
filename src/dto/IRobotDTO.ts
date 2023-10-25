import { RobotType } from "../domain/robotType";
import { IRobotType } from "./IRobotType";

export interface IRobotDTO {
    nickName: string;
    robotType: string;
    serialNr: string;
    description: string;
}
