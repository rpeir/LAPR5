import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType/robotType";
import { TaskType } from "../../domain/taskType/taskType";

export default interface IRobotTypeRepo extends Repo<RobotType>{
  save(robotType: RobotType): Promise<RobotType>;
  findByName(name: string): Promise<RobotType>;
  findById(id: string): Promise<RobotType>;
  findAll(): Promise<RobotType[]> ;
  findByTaskType(taskType: TaskType): Promise<RobotType[]>;
}
