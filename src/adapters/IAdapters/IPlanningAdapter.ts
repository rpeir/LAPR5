import { Result } from "../../core/logic/Result";
import { IPathDTO } from "../../dto/IPathDTO";

export default interface IPlanningAdapter {
  getPathLessBuildings(floorSource: string, floorDestination: string): Promise<Result<IPathDTO>>;
  getPathLessElevators(floorSource: string, floorDestination: string): Promise<Result<IPathDTO>>;
  getPathLessElevatorsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string): Promise<Result<IPathDTO>>;
  getPathLessBuildingsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string): Promise<Result<IPathDTO>>;
}
