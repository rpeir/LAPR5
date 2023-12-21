import { Inject, Service } from "typedi";

import config from "../../config";
import ITaskService from "./IServices/ITaskService";
import { ITaskDTO } from "../dto/ITaskDTO";
import ITaskRepo from "./IRepos/ITaskRepo";
import { GenericAppError } from "../core/logic/AppError";
import InvalidRequestError = GenericAppError.InvalidRequestError;
import UnexpectedError = GenericAppError.UnexpectedError;
import { ITaskRequestDTO } from "../dto/ITaskRequestDTO";



@Service()
export default class TaskService implements ITaskService {
  constructor(
    @Inject(config.repos.task.name) private taskRepo: ITaskRepo
  ) {}

  public async approveTask(requestId: string): Promise<ITaskDTO> {
   return await this.taskRepo.approveTask(requestId);
  }

  public async getAll(): Promise<ITaskDTO[]> {
    return await this.taskRepo.findAll();
  }

  public async getById(id: string): Promise<ITaskDTO> {
    return  this.taskRepo.findById(id);
  }

}
