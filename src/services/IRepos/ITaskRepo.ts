import { ITaskDTO } from "../../dto/ITaskDTO";

export default interface ITaskRepo {
  findAll(): Promise<ITaskDTO[]>;
  findById(id: string): Promise<ITaskDTO>;
  approveTask(requestId: string): Promise<ITaskDTO>;
}
