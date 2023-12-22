import { ITaskDTO } from "../../dto/ITaskDTO";
import { ITaskRequestDTO } from "../../dto/ITaskRequestDTO";

export default interface ITaskRepo {
  findAll(): Promise<ITaskDTO[]>;
  findById(id: string): Promise<ITaskDTO>;
  approveTask(requestId: string): Promise<ITaskDTO>;
  rejectTask(requestId: string): Promise<ITaskRequestDTO>;
  findTaskRequests(params : [string, string][]): Promise<ITaskRequestDTO[]>;
  findTaskRequestById(id: string): Promise<ITaskRequestDTO>;
  createTaskRequest(taskRequestDTO: ITaskRequestDTO): Promise<ITaskRequestDTO>;
}
