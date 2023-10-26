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
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

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
                newElevatorCode=+latestElevatorCode.code+1;
            }
            const elevatorFloorsServed=await Promise.all(elevatorDTO.floorsServed.map(floor => this.floorRepo.findByBuildingAndNumber(building.id.toString(), +floor)));

            const elevatorOrError = Elevator.create({

                code:newElevatorCode,
                designation: elevatorDesignation,
                buildingDesignation: elevatorBuildingDesignation,
                floorsServed: elevatorFloorsServed,
                brand: elevatorDTO.brand,
                modelE: elevatorDTO.modelE,
                serialNumber: elevatorDTO.serialNumber,
                description: elevatorDTO.description,
            },new UniqueEntityID(elevatorDTO.id)
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
    public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {
            const elevatorOrError=await this.elevatorRepo.findById(elevatorDTO.id);
            if(elevatorOrError==null){
                const newElevator=await this.createElevator(elevatorDTO);
            }
            const elevator=elevatorOrError;
            elevator.designation=elevatorDTO.designation?elevatorDTO.designation:elevator.designation;

            elevator.buildingDesignation=elevator.buildingDesignation;
            const building=await this.buildingRepo.findByDesignation(elevator.buildingDesignation);
            elevator.floorsServed=elevatorDTO.floorsServed?await Promise.all(elevatorDTO.floorsServed.map(floor => this.floorRepo.findByBuildingAndNumber(building.id.toString(), +floor))):elevator.floorsServed;
            elevator.brand=elevatorDTO.brand?elevatorDTO.brand:elevator.brand;
            elevator.modelE=elevatorDTO.modelE?elevatorDTO.modelE:elevator.modelE;
            elevator.serialNumber=elevatorDTO.serialNumber?elevatorDTO.serialNumber:elevator.serialNumber;
            elevator.description=elevatorDTO.description?elevatorDTO.description:elevator.description;
            await this.elevatorRepo.save(elevator);
            const elevatorDTOResult =ElevatorMap.toDTO(elevator) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);
        } catch (err){
            throw Result.fail<IElevatorDTO>(err);
        }
    }
}
