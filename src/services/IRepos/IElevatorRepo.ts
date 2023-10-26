import {Elevator} from "../../domain/elevator";
import {Repo} from "../../core/infra/Repo";

export default interface IElevatorRepo extends Repo<Elevator>{
    save(elevator:Elevator): Promise<Elevator>;
    findByCode(code: number): Promise<Elevator>;
    findByDesignation(designation: string): Promise<Elevator>;
    findLatestElevatorByBuilding(buildingId:String): Promise<Elevator>;
    listElevators(buildingDesignation:String): Promise<Elevator[]>;
}
