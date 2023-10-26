import {Inject, Service} from "typedi";
import IElevatorService from "./IServices/IElevatorService";
import config from "../../config";
import IElevatorRepo from "./IRepos/IElevatorRepo";
import {IElevatorDTO} from "../dto/IElevatorDTO";
import {Result} from "../core/logic/Result";
import {Elevator} from "../domain/elevator";
import {ElevatorMap} from "../mappers/ElevatorMap";
import IFloorRepo from "./IRepos/IFloorRepo";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import {IBuildingDTO} from "../dto/IBuildingDTO";

@Service()
export default class ElevatorService implements IElevatorService{
    constructor(
        @Inject(config.repos.elevator.name) private  elevatorRepo: IElevatorRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    ) {
    }
    public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try{

            const elevatorDesignation=elevatorDTO.designation;
            const elevatorBuildingDesignation=elevatorDTO.buildingDesignation;
            const building=await this.buildingRepo.findByDesignation(elevatorBuildingDesignation);
            const latestElevatorCode=await this.elevatorRepo.findLatestElevatorByBuilding(building.designation);
            let newElevatorCode=1;
            if(latestElevatorCode!=null){
                newElevatorCode=newElevatorCode+1;
            }
            const elevatorFloorsServed=await Promise.all(elevatorDTO.floorsServed.map(floor => this.floorRepo.findByBuildingAndNumber(building.id.toString(), +floor)));

            const elevatorOrError = Elevator.create({
                code:newElevatorCode,
                designation: elevatorDesignation,
                buildingDesignation: elevatorBuildingDesignation,
                floorsServed: elevatorFloorsServed,
            }
            );
            if(elevatorOrError.isFailure){
                throw Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
            }
            const elevatorResult=elevatorOrError.getValue();
            await this.elevatorRepo.save(elevatorResult);
            const elevatorDTOResult =ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);
        } catch (err) {
            throw err;
        }
    }
    public async listElevator(buildingDesignation:string): Promise<Result<IElevatorDTO[]>>{
        try {
            const listOrError =await this.elevatorRepo.listElevators(buildingDesignation);
           const listResult=listOrError.map(elevator=> ElevatorMap.toDTO(elevator));
           return Result.ok<IElevatorDTO[]>(listResult);

        } catch (err){
            throw Result.fail<IElevatorDTO>(err);
        }
    }
}
