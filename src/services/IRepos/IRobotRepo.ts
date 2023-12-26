import { Robot } from '../../domain/robot/robot';
import { Repo } from '../../core/infra/Repo';
import { RobotNickName } from '../../domain/robot/robotNickName';
import { RobotType } from "../../domain/robotType/robotType";

export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findByNickName(nickName: RobotNickName | string): Promise<Robot>;
  findById(id: string): Promise<Robot>;
  findByRobotCode(robotCode: string): Promise<Robot>;
  updateOne(robot: Robot): Promise<Robot>;
  findAll(): Promise<Robot[]>;
  findByRobotType(taskType: RobotType[]): Promise<Robot[]>;
}
