import { Result } from "../../core/logic/Result";
import { IPathwayDTO } from "../../dto/IPathwayDTO";
import { IPlanningFloorDTO } from "../../dto/IPlanningFloorDTO";
import { IPlanningElevatorDTO } from "../../dto/IPlanningElevatorDTO";
import { IPlanningPathwayDTO } from "../../dto/IPlanningPathwayDTO";
import { IPathDTO } from "../../dto/IPathDTO";

export default interface IPlanningService {
  getFloors(): Promise<Result<IPlanningFloorDTO[]>>;
  getElevators(): Promise<Result<IPlanningElevatorDTO[]>>;
  getPathways(): Promise<Result<IPlanningPathwayDTO[]>>;
  getPath(floorSource: string, floorDestination: string): Promise<Result<IPathDTO>>;
}
