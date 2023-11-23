import { Result } from "../../core/logic/Result";
import { IPlanningFloorDTO } from "../../dto/IPlanningFloorDTO";
import { IPlanningElevatorDTO } from "../../dto/IPlanningElevatorDTO";
import { IPlanningPathwayDTO } from "../../dto/IPlanningPathwayDTO";
import { IPathDTO } from "../../dto/IPathDTO";
import { IPlanningRoomLocationDTO } from "../../dto/IPlanningRoomLocationDTO";
import { IPlanningElevatorLocationDTO } from "../../dto/IPlanningElevatorLocationDTO";
import { IPlanningPathwayLocationDTO } from "../../dto/IPlanningPathwayLocationDTO";
import { IPlanningMatrixDTO } from "../../dto/IPlanningMatrixDTO";

export default interface IPlanningService {
  getFloors(): Promise<Result<IPlanningFloorDTO[]>>;
  getElevators(): Promise<Result<IPlanningElevatorDTO[]>>;
  getPathways(): Promise<Result<IPlanningPathwayDTO[]>>;
  getPathLessBuildings(floorSource: string, floorDestination: string): Promise<Result<IPathDTO>>;
  getPathLessElevators(floorSource: string, floorDestination: string): Promise<Result<IPathDTO>>;
  getFloorPlanningMatrix(floor: string):  Promise<Result<IPlanningMatrixDTO>> ;
  getPlanningPathwayLocation(floorSource: string): Promise<Result<IPlanningPathwayLocationDTO[]>>;
  getPlanningElevatorLocation(floorSource: string): Promise<Result<IPlanningElevatorLocationDTO[]>>;
  getPlanningRoomsLocation(floorSource: string) : Promise<Result<IPlanningRoomLocationDTO[]>>;
  getPathLessElevatorsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string): Promise<Result<IPathDTO>>;
  getPathLessBuildingsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string): Promise<Result<IPathDTO>>;
}
