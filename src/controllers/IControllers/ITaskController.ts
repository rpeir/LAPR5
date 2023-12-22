import { NextFunction, Request, Response } from 'express';

export default interface ITaskController {
  getAll(req: Request, res: Response, next: NextFunction);
  getById(req: Request, res: Response, next: NextFunction);
  approveTask(req: Request, res: Response, next: NextFunction);
  rejectTask(req: Request, res: Response, next: NextFunction);
  getTaskRequests(req: Request, res: Response, next: NextFunction);
  getTaskRequestById(req: Request, res: Response, next: NextFunction);
  createTaskRequest(req: Request, res: Response, next: NextFunction);
}
