import {NextFunction, Request, Response} from "express";
import {User} from "../../domain/user/user";

export default interface IUserRequestController {
  listAllRequests(req: Request, res: Response, next: NextFunction);
  registerUser(req: Request, res: Response, next: NextFunction);
  declineUser(req: Request, res: Response, next: NextFunction): void;
}
