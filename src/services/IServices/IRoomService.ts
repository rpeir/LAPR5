import IRoomDTO from "../../dto/IRoomDTO";
import { Result } from "../../core/logic/Result";

export default interface IRoomService {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  getRoomsByBuildingAndFloor(building: string, floor: string): Promise<Result<IRoomDTO[]>>;
  getRoomById(roomId: string): Promise<Result<IRoomDTO>>;
}
