import { Inject, Service } from "typedi";
import e, { NextFunction, Request, Response } from "express";
import config from "../../config";
import ITaskController from "./IControllers/ITaskController";
import ITaskService from "../services/IServices/ITaskService";
import { ITaskDTO } from "../dto/ITaskDTO";
import { GenericAppError } from "../core/logic/AppError";
import UnexpectedError = GenericAppError.UnexpectedError;
import InvalidRequestError = GenericAppError.InvalidRequestError;

import IRobotService from "../services/IServices/IRobotService";

@Service()
export default class TaskController implements ITaskController {
  constructor(
    @Inject(config.services.task.name) private taskService: ITaskService,
    @Inject(config.services.robot.name) private robotService: IRobotService
  ) {}

  public async getTaskRequests(req: Request, res: Response, next: NextFunction) {
    try {
      let robotId = '';
      // @ts-ignore
      const params : [string, string][] = Object.entries(req.query);

      // if params contains robotType, find robotId list
      if (params.some(([key, value]) => key === 'robotType')) {
        const robotType = params.find(([key, value]) => key === 'robotType')[1];
        const robotIds = await this.robotService.consultRobotsByRobotType(robotType);
        // add robotIds to robotId string separated by commas and no final comma
        for (const robot of robotIds.getValue()) {
          robotId += robot.id + ',';
        }
        // remove robotType from params and add robotId
        params.push(['robotId', robotId.slice(0, -1)]);
        params.splice(
          params.findIndex(([key, value]) => key === 'robotType'),
          1,
        );
      }

      const tasks = await this.taskService.getTaskRequests(params);

      return res.status(200).json(tasks);

    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return res.status(error.errorValue().statusCode).json(error.errorValue().error);
      } else {
        return next(error);
      }
    }
  }

  public async getTaskRequestById(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.taskService.getTaskRequestById(req.params.id);

      return res.status(200).json(task);

    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return res.status(error.errorValue().statusCode).json(error.errorValue().error);
      } else {
        return next(error)
      }
    }
  }

  public async createTaskRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.taskService.createTaskRequest(req.body);

      return res.status(201).json(task);

    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return res.status(error.errorValue().statusCode).json(error.errorValue().error);
      } else {
        return next(error)
      }
    }
  }

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
      const task = await this.taskService.approveTask(req.body.taskRequestId, req.body.robotId);

      return res.status(201).json(task);

    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return res.status(error.errorValue().statusCode).json(error.errorValue().error);
      } else {
        return next(error)
      }
    }
  }

  public async rejectTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.taskService.rejectTask(req.params.id);

      return res.status(200).json(task);

    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return res.status(error.errorValue().statusCode).json(error.errorValue().error);
      } else {
        return next(error)
      }
    }
  }

  public async getPendingTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.taskService.getPendingTasks();

      return res.status(200).json(tasks);
    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return res.status(error.errorValue().statusCode).json(error.errorValue().error);
      } else {
        return next(error)
      }
    }
  }

}
