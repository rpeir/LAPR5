import { NextFunction, Request, Response } from 'express';
import { ITaskDTO } from "../../dto/ITaskDTO";
import { Result } from "../../core/logic/Result";

export default interface ITaskController {
  getAll(req: Request, res: Response, next: NextFunction);
  getById(req: Request, res: Response, next: NextFunction);
  approveTask(req: Request, res: Response, next: NextFunction);
}
