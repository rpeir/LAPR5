import { ITaskDTO } from "../../dto/ITaskDTO";
import { ITaskRequestDTO } from "../../dto/ITaskRequestDTO";
import { Task } from "../../domain/task/task";

export default interface ITaskAdapter {
  findAll() : Promise<Task[]>;
  findById(id: string): Promise<Task>;
  approveTask(requestId: string): Promise<Task>;
  rejectTask(requestId: string): Promise<ITaskRequestDTO>;
  findTaskRequests(params : [string, string][]): Promise<ITaskRequestDTO[]>;
  findTaskRequestById(id: string): Promise<ITaskRequestDTO>;
  createTaskRequest(taskRequestDTO: ITaskRequestDTO): Promise<ITaskRequestDTO>;
  findPendingTasks(): Promise<Task[]>;
}
