import { Inject, Service } from "typedi";

import config from "../../config";
import ITaskService from "./IServices/ITaskService";
import { ITaskDTO } from "../dto/ITaskDTO";
import ITaskRepo from "./IRepos/ITaskRepo";
import { ITaskRequestDTO } from "../dto/ITaskRequestDTO";



@Service()
export default class TaskService implements ITaskService {
  constructor(
    @Inject(config.repos.task.name) private taskRepo: ITaskRepo
  ) {}
  public async approveTask(requestId: string): Promise<ITaskDTO> {
   return await this.taskRepo.approveTask(requestId);
  }

  public async rejectTask(requestId: string): Promise<ITaskRequestDTO> {
    return await this.taskRepo.rejectTask(requestId);
  }

  public async getAll(): Promise<ITaskDTO[]> {
    return await this.taskRepo.findAll();
  }

  public async getById(id: string): Promise<ITaskDTO> {
    return  this.taskRepo.findById(id);
  }

  public async getTaskRequests(): Promise<ITaskRequestDTO[]> {
    return await this.taskRepo.findTaskRequests();
  }

  public async getTaskRequestById(id: string): Promise<ITaskRequestDTO> {
    return await this.taskRepo.findTaskRequestById(id);
  }

  public async createTaskRequest(taskRequestDTO: ITaskRequestDTO): Promise<ITaskRequestDTO> {
    return await this.taskRepo.createTaskRequest(taskRequestDTO);
  }

}
