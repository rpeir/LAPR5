import { Result } from "../../core/logic/Result";
import { IPathwayDTO } from "../../dto/IPathwayDTO";
import { IPlanningFloorDTO } from "../../dto/IPlanningFloorDTO";
import { IElevatorDTO } from "../../dto/IElevatorDTO";

export default interface IPlanningService {
  getFloors(): Promise<Result<IPlanningFloorDTO[]>>;
  getElevators(): Promise<Result<IElevatorDTO[]>>;
  getPatways(): Promise<Result<IPathwayDTO[]>>;
}
