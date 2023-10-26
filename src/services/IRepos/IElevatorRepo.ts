import {Elevator} from "../../domain/elevator";
import {Repo} from "../../core/infra/Repo";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

export default interface IElevatorRepo extends Repo<Elevator>{
    save(elevator:Elevator): Promise<Elevator>;
    findById(domainId: UniqueEntityID| string): Promise<Elevator>;
    findByDesignation(designation: string): Promise<Elevator>;
    findLatestElevatorByBuilding(buildingId:String): Promise<Elevator>;
    listElevators(buildingDesignation:String): Promise<Elevator[]>;
}
