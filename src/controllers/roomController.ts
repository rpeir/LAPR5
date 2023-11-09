import { Inject, Service } from 'typedi';
import e from 'express';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IRoomController from './IControllers/IRoomController';
import IRoomDTO from '../dto/IRoomDTO';
import IRoomService from '../services/IServices/IRoomService';

@Service()
export default class RoomController implements IRoomController {
  constructor(@Inject(config.services.room.name) private roomService: IRoomService) {}

  public async createRoom(req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
      const roomOrError = (await this.roomService.createRoom(req.body as IRoomDTO)) as Result<IRoomDTO>;

      if (roomOrError.isFailure) {
        return res
          .status(402)
          .json({ error: roomOrError.error })
          .send();
      }

      const roomDTO = roomOrError.getValue();
      return res.status(201).json(roomDTO);
    } catch (error) {
      next(error);
    }
  }
}
