import { ITaskDTO } from "../../dto/ITaskDTO";
import { ITaskRequestDTO } from "../../dto/ITaskRequestDTO";

export default interface ITaskAdapter {
  findAll(): Promise<ITaskDTO[]>;
  findById(id: string): Promise<ITaskDTO>;
  approveTask(requestId: string): Promise<ITaskDTO>;
  rejectTask(requestId: string): Promise<ITaskRequestDTO>;
  findTaskRequests(): Promise<ITaskRequestDTO[]>;
  findTaskRequestById(id: string): Promise<ITaskRequestDTO>;
  createTaskRequest(taskRequestDTO: ITaskRequestDTO): Promise<ITaskRequestDTO>;
  findPendingTasks(): Promise<ITaskDTO[]>;
}
