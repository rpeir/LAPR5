import { Inject, Service } from "typedi";

import config from "../../config";
import ITaskService from "./IServices/ITaskService";
import { ITaskDTO } from "../dto/ITaskDTO";
import { ITaskRequestDTO } from "../dto/ITaskRequestDTO";
import ITaskAdapter from "../adapters/IAdapters/ITaskAdapter";
import { TaskMapper } from "../mappers/TaskMapper";


@Service()
export default class TaskService implements ITaskService {
  constructor(
    @Inject(config.adapters.taskAdapter.name) private taskAdapter: ITaskAdapter) {
  }

  public async approveTask(requestId: string): Promise<ITaskDTO> {
    const task = await this.taskAdapter.approveTask(requestId);
    return TaskMapper.toDTO(task);
  }

  public async rejectTask(requestId: string): Promise<ITaskRequestDTO> {
    return await this.taskAdapter.rejectTask(requestId);
  }

  public async getAll(): Promise<ITaskDTO[]> {
    const tasks = await this.taskAdapter.findAll();
    return tasks.map((task) => TaskMapper.toDTO(task));
  }

  public async getById(id: string): Promise<ITaskDTO> {
    const task = await this.taskAdapter.findById(id);
    return TaskMapper.toDTO(task);
  }

  public async getTaskRequests(params : [string, string][]): Promise<ITaskRequestDTO[]> {
    return await this.taskAdapter.findTaskRequests(params);
  }

  public async getTaskRequestById(id: string): Promise<ITaskRequestDTO> {
    return await this.taskAdapter.findTaskRequestById(id);
  }

  public async createTaskRequest(taskRequestDTO: ITaskRequestDTO): Promise<ITaskRequestDTO> {
    return await this.taskAdapter.createTaskRequest(taskRequestDTO);
  }

  public async getPendingTasks(): Promise<ITaskDTO[]> {
    const tasks = await this.taskAdapter.findPendingTasks();
    return tasks.map((task) => TaskMapper.toDTO(task));
  }

}
