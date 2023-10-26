import {IElevatorDTO} from "../../dto/IElevatorDTO";
import {Result} from "../../core/logic/Result";
import {IBuildingDTO} from "../../dto/IBuildingDTO";

export default interface IElevatorService {
    createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
   // updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
    listElevator(buildingDesignation:string): Promise<Result<IElevatorDTO[]>>;
}
