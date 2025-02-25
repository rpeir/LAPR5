import { IRobotDTO } from '../../dto/IRobotDTO';
import { Result } from '../../core/logic/Result';

export default interface IRobotService {
  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  disableRobot(body: IRobotDTO): Promise<Result<IRobotDTO>>;
  consultAllRobots(): Promise<Result<IRobotDTO[]>>;
  consultRobotsByTaskType(taskType: string): Promise<Result<IRobotDTO[]>>;
  consultRobotsByRobotType(robotType: string): Promise<Result<IRobotDTO[]>>;
}
