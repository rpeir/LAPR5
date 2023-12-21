import { Inject, Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import ITaskController from "./IControllers/ITaskController";
import ITaskService from "../services/IServices/ITaskService";
import { ITaskDTO } from "../dto/ITaskDTO";
import { GenericAppError } from "../core/logic/AppError";
import UnexpectedError = GenericAppError.UnexpectedError;
import InvalidRequestError = GenericAppError.InvalidRequestError;
import { ITaskRequestDTO } from "../dto/ITaskRequestDTO";

@Service()
export default class TaskController implements ITaskController {

  constructor(
    @Inject(config.services.task.name) private taskService: ITaskService
  ) {}

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.taskService.getAll();

      return res.status(200).json(tasks);

    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return res.status(error.errorValue().statusCode).json(error.errorValue().error);
      } else {
        return next(error)
      }
    }
  }


  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.taskService.getById(req.params.id);

      return res.status(200).json(task);

    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return res.status(error.errorValue().statusCode).json(error.errorValue().error);
      } else {
        return next(error)
      }
    }
  }

  public async approveTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.taskService.approveTask(req.body);

      return res.status(201).json(task);

    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return res.status(error.errorValue().statusCode).json(error.errorValue().error);
      } else {
        return next(error)
      }
    }
  }

}
