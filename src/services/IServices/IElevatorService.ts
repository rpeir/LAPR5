import {IElevatorDTO} from "../../dto/IElevatorDTO";
import {Result} from "../../core/logic/Result";

export default interface IElevatorService {
    createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
}
