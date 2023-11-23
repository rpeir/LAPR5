import { Inject, Service } from 'typedi';

import { NextFunction, Request, Response } from "express";
import config from '../../config';
import { Result } from '../core/logic/Result';
import IRoomController from './IControllers/IRoomController';
import IRoomDTO from '../dto/IRoomDTO';
import IRoomService from '../services/IServices/IRoomService';

@Service()
export default class RoomController implements IRoomController {
  constructor(@Inject(config.services.room.name) private roomService: IRoomService) {}

  public async createRoom(req: Request, res: Response, next: NextFunction) {
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

  public async getRoomsByBuildingsAndFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const building = req.query.building as string
      const floor = req.query.floor as string;
      const roomsOrError = await this.roomService.getRoomsByBuildingAndFloor(building, floor);
      if (roomsOrError.isFailure) {
        return res
          .status(402)
          .json({ error: roomsOrError.error })
          .send();
      };
      const roomsDTO = roomsOrError.getValue();
      return res.status(201).json(roomsDTO);
    } catch (error) {
      next(error);
    }
  }
}
