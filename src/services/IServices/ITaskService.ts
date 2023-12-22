import { ITaskDTO } from "../../dto/ITaskDTO";
import { Result } from "../../core/logic/Result";
import { ITaskRequestDTO } from "../../dto/ITaskRequestDTO";

export default interface ITaskService {
  getAll(): Promise<ITaskDTO[]>;
  getById(id: string): Promise<ITaskDTO>;
  approveTask(requestId : string) : Promise<ITaskDTO>;
  rejectTask(requestId : string) : Promise<ITaskRequestDTO>;
  getTaskRequests(params : [string, string][]) : Promise<ITaskRequestDTO[]>;
  getTaskRequestById(id: string) : Promise<ITaskRequestDTO>;
  createTaskRequest(taskRequestDTO : ITaskRequestDTO) : Promise<ITaskRequestDTO>;
}
