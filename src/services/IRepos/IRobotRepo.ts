import { Robot } from "../../domain/robot";
import { Repo } from "../../core/infra/Repo";
import { RobotNickName } from "../../domain/robotNickName";

export default interface IRobotRepo extends Repo<Robot>{
  save(robot: Robot): Promise<Robot>;
  findByNickName(nickName: RobotNickName): Promise<Robot>;
  findById(id: string): Promise<Robot>;

}
