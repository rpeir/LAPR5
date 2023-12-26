import { Service } from "typedi";
import { ITaskDTO } from "../dto/ITaskDTO";
import config from "../../config";
import { GenericAppError } from "../core/logic/AppError";
import IRequestError = GenericAppError.IRequestError;
import InvalidRequestError = GenericAppError.InvalidRequestError;
import axios, { AxiosError } from "axios";
import { ITaskRequestDTO } from "../dto/ITaskRequestDTO";
import ITaskAdapter from "./IAdapters/ITaskAdapter";
import { TaskPersistence } from "../persistence/TaskPersistence";
import { TaskMapper } from "../mappers/TaskMapper";
import { Task } from "../domain/task/task";

@Service()
export default class TaskAdapter implements ITaskAdapter {
  public async findPendingTasks(): Promise<Task[]> {
    try {
      const res = await axios.get(`http://${config.tasksHost}:${config.tasksPort}/api/tasks/pending`);
      let tasks = [];
      const tasksPersistence = res.data as TaskPersistence[];

      console.log(tasksPersistence);
      for (let taskPersistence of tasksPersistence) {
        tasks.push(await TaskMapper.toDomain(taskPersistence));
      }

      return tasks;
    } catch (err) {
      if (err instanceof AxiosError) await this.handleAxiousError(err);
    }
  }
  public async findById(id: string): Promise<Task> {
    try {
      const res = await axios.get(`http://${config.tasksHost}:${config.tasksPort}/api/tasks/${id}`);
      return res.data as Task;
    } catch (err) {
      if (err instanceof AxiosError) await this.handleAxiousError(err);
    }
  }
  public async findAll() : Promise<Task[]>  {
    try {
      const res = await axios.get(`http://${config.tasksHost}:${config.tasksPort}/api/tasks`);
      let tasks = [];
      const tasksPersistence = res.data as TaskPersistence[];
      for (let taskPersistence of tasksPersistence) {
        tasks.push(await TaskMapper.toDomain(taskPersistence));
      }
      return tasks;
    } catch (err) {
        if (err instanceof AxiosError) await this.handleAxiousError(err);
    }
  }

  public async approveTask(requestId: string, robotId : string): Promise<Task> {
    const body = {
      taskRequestId: requestId,
      robotId: robotId
    }

    try {
      const res = await axios.post(`http://${config.tasksHost}:${config.tasksPort}/api/tasks`, body);
      return res.data as Task;
    } catch (err) {
      if (err instanceof AxiosError) await this.handleAxiousError(err);
    }

  }

  private async handleAxiousError(err : AxiosError) {
    // if connection refused
    if (err.code === "ECONNREFUSED") {
      const error = {statusCode: 503, message: "Service Unavailable", error: "Service Unavailable"} as IRequestError
      throw new InvalidRequestError(error);
    } else {
      let code : number = err.response.status;
      if (code === 500) {
        code = 503;
      }
      const error = {statusCode: code, message: err.response.statusText, error: err.response.data} as IRequestError
      throw new InvalidRequestError(error);
    }
  }

  public async rejectTask(requestId: string): Promise<ITaskRequestDTO> {
    try {
      const res = await axios.delete(`http://${config.tasksHost}:${config.tasksPort}/api/taskRequests/${requestId}`);
      return res.data as ITaskRequestDTO;
    } catch (err) {
      if (err instanceof AxiosError) await this.handleAxiousError(err);
    }
  }

  public async findTaskRequests(params : [string, string][]): Promise<ITaskRequestDTO[]> {
    try {
      let urlString = `http://${config.tasksHost}:${config.tasksPort}/api/taskRequests`;
      let i = 0;
      for (let param of params) {
        if (i === 0) { urlString += "?" } else { urlString += "&"}
        urlString += param[0] + "=" + param[1];
      }
      const res = await axios.get(urlString);
      return res.data as ITaskRequestDTO[];
    } catch (err) {
      if (err instanceof AxiosError) await this.handleAxiousError(err);
    }
  }

  public async findTaskRequestById(id: string): Promise<ITaskRequestDTO> {
    try {
      const res = await axios.get(`http://${config.tasksHost}:${config.tasksPort}/api/taskRequests/${id}`);
      return res.data as ITaskRequestDTO;
    } catch (err) {
      if (err instanceof AxiosError) await this.handleAxiousError(err);
    }
  }

  public async createTaskRequest(taskRequestDTO: ITaskRequestDTO): Promise<ITaskRequestDTO> {
    try {
      const res = await axios.post(`http://${config.tasksHost}:${config.tasksPort}/api/taskRequests`, taskRequestDTO);
      return res.data as ITaskRequestDTO;
    } catch (err) {
      if (err instanceof AxiosError) await this.handleAxiousError(err);
    }
  }
}
