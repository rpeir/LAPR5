import { Service } from "typedi";
import ITasksRepo from "../services/IRepos/ITaskRepo";
import { ITaskDTO } from "../dto/ITaskDTO";
import config from "../../config";
import { GenericAppError } from "../core/logic/AppError";
import IRequestError = GenericAppError.IRequestError;
import InvalidRequestError = GenericAppError.InvalidRequestError;

import axios, { AxiosError } from "axios";

@Service()
export default class TaskConnection implements ITasksRepo {
  public async findById(id: string): Promise<ITaskDTO> {
    try {
      const res = await axios.get(`http://${config.tasksHost}:${config.tasksPort}/api/tasks/${id}`);
      return res.data as ITaskDTO;
    } catch (err) {
      if (err instanceof AxiosError) await this.handleAxiousError(err);
    }
  }
  public async findAll() : Promise<ITaskDTO[]> {
    try {
      const res = await axios.get(`http://${config.tasksHost}:${config.tasksPort}/api/tasks`);
      return res.data as ITaskDTO[];
    } catch (err) {
        if (err instanceof AxiosError) await this.handleAxiousError(err);
    }
  }

  public async approveTask(requestId: string): Promise<ITaskDTO> {
    const body = {
      taskRequestId: requestId
    }

    try {
      const res = await axios.post(`http://${config.tasksHost}:${config.tasksPort}/api/tasks`, requestId);
      return res.data as ITaskDTO;
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
}
