import { Inject, Service } from "typedi";

import config from "../../config";
import ITaskService from "./IServices/ITaskService";
import { ITaskDTO } from "../dto/ITaskDTO";
import { ITaskRequestDTO } from "../dto/ITaskRequestDTO";
import ITaskAdapter from "../adapters/IAdapters/ITaskAdapter";



@Service()
export default class TaskService implements ITaskService {
  constructor(
    @Inject(config.adapters.taskAdapter.name) private taskAdapter: ITaskAdapter
  ) {}
  public async approveTask(requestId: string): Promise<ITaskDTO> {
   return await this.taskAdapter.approveTask(requestId);
  }

  public async rejectTask(requestId: string): Promise<ITaskRequestDTO> {
    return await this.taskAdapter.rejectTask(requestId);
  }

  public async getAll(): Promise<ITaskDTO[]> {
    return await this.taskAdapter.findAll();
  }

  public async getById(id: string): Promise<ITaskDTO> {
    return  this.taskAdapter.findById(id);
  }

  public async getTaskRequests(): Promise<ITaskRequestDTO[]> {
    return await this.taskAdapter.findTaskRequests();
  }

  public async getTaskRequestById(id: string): Promise<ITaskRequestDTO> {
    return await this.taskAdapter.findTaskRequestById(id);
  }

  public async createTaskRequest(taskRequestDTO: ITaskRequestDTO): Promise<ITaskRequestDTO> {
    return await this.taskAdapter.createTaskRequest(taskRequestDTO);
  }

  public async getPendingTasks(): Promise<ITaskDTO[]> {
    return await this.taskAdapter.findPendingTasks();
  }

}
