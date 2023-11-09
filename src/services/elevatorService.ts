import {Inject, Service} from "typedi";
import IElevatorService from "./IServices/IElevatorService";
import config from "../../config";
import IElevatorRepo from "./IRepos/IElevatorRepo";
import {IElevatorDTO} from "../dto/IElevatorDTO";
import {Result} from "../core/logic/Result";
import {Elevator} from "../domain/elevator/elevator";
import {ElevatorMap} from "../mappers/ElevatorMap";
import IFloorRepo from "./IRepos/IFloorRepo";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {error} from "winston";

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

            const elevatorFloorsServed = await Promise.all(elevatorDTO.floorsServed.map(floor => this.floorRepo.findByBuildingAndNumber(building.id.toString(), +floor)));

            try { elevatorFloorsServed.map(floor => {if (floor == null) throw new Error("Floor not found")});}
            catch (err) {return Result.fail<IElevatorDTO>(err.message);
            }

            const elevatorOrError = Elevator.create({

                code:newElevatorCode,
                designation: elevatorDesignation,
                buildingDesignation: elevatorBuildingDesignation,
                floorsServed: elevatorFloorsServed,
                brand: elevatorDTO.brand?elevatorDTO.brand:"",
                modelE: elevatorDTO.modelE?elevatorDTO.modelE:"",
                serialNumber: elevatorDTO.serialNumber?elevatorDTO.serialNumber:"",
                description: elevatorDTO.description?elevatorDTO.description:"",
            },new UniqueEntityID(elevatorDTO.id)
            );
            if(elevatorOrError.isFailure){
                return  Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
            }
            const elevatorResult=elevatorOrError.getValue();
            try {
              await this.elevatorRepo.save(elevatorResult);
            } catch (error) {
              return Result.fail<IElevatorDTO>(error);
            }
            const elevatorDTOResult =ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);
        } catch (err) {
            throw err;
        }
    }
  /*  public async listElevator(buildingDesignation:string): Promise<Result<IElevatorDTO[]>>{
        try {
          const listOrError = await this.elevatorRepo.listElevators(buildingDesignation);
          const listResult=listOrError.map(elevator=> ElevatorMap.toDTO(elevator));
          if(listResult.length==0){
            return Result.fail<IElevatorDTO[]>("No elevators found for specified building");
          }
          return Result.ok<IElevatorDTO[]>(listResult);

        } catch (err){
            throw Result.fail<IElevatorDTO>(err);
        }
    }

   */
  public async listElevator(buildingDesignation: string): Promise<Result<IElevatorDTO[]>> {
    try {
      const listOrError = await this.elevatorRepo.listElevators(buildingDesignation);
      const listResult = listOrError.map((elevator) => ElevatorMap.toDTO(elevator));

      if (listResult.length === 0) {
        return Result.fail<IElevatorDTO[]>("No elevators found for the specified building");
      }

      return Result.ok<IElevatorDTO[]>(listResult);
    } catch (err) {
      // Handle errors here if needed.
      throw Result.fail<IElevatorDTO>(err);
    }
  }

  public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {
            let elevatorOrError=await this.elevatorRepo.findById(elevatorDTO.id);
            if(elevatorOrError==null){
                return Result.fail<IElevatorDTO>("Elevator not found");
            }
            const elevator=elevatorOrError;
            elevatorDTO.designation=elevatorDTO.designation?elevatorDTO.designation:elevator.designation;

            elevatorDTO.buildingDesignation=elevatorDTO.buildingDesignation?elevatorDTO.buildingDesignation:elevator.buildingDesignation;
            const building=await this.buildingRepo.findByDesignation(elevator.buildingDesignation);
            elevatorDTO.floorsServed=elevatorDTO.floorsServed?elevatorDTO.floorsServed:elevator.floorsServed.map(floor=>floor.floorNr.toString());
            elevatorDTO.code=String(elevator.code);
            elevatorDTO.brand=elevatorDTO.brand?elevatorDTO.brand:elevator.brand;
            elevatorDTO.modelE=elevatorDTO.modelE?elevatorDTO.modelE:elevator.modelE;
            elevatorDTO.serialNumber=elevatorDTO.serialNumber?elevatorDTO.serialNumber:elevator.serialNumber;
            elevatorDTO.description=elevatorDTO.description?elevatorDTO.description:elevator.description;
            let updatedElevator;
            try {
               updatedElevator = await ElevatorMap.toDomain(elevatorDTO);
            } catch (error) {
              return  Result.fail<IElevatorDTO>(error.message);
            }

            try {
                 await this.elevatorRepo.save(updatedElevator);
            } catch (error) {
                return Result.fail<IElevatorDTO>(error);
            }
            const elevatorDTOResult =ElevatorMap.toDTO(elevator) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);
        } catch (err){
            throw Result.fail<IElevatorDTO>(err);
        }
    }
  public async replaceElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      let elevatorOrError=await this.elevatorRepo.findById(elevatorDTO.id);
      if(elevatorOrError==null){
        return await this.createElevator(elevatorDTO);
      }
      elevatorDTO.code=elevatorOrError.code.toString();
      const elevator=await ElevatorMap.toDomain(elevatorDTO);
      try {
        await this.elevatorRepo.save(elevator);
      } catch (error) {
        return Result.fail<IElevatorDTO>(error);
      }
      const elevatorDTOResult =ElevatorMap.toDTO(elevator) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOResult);
    } catch (err){
      throw Result.fail<IElevatorDTO>(err);
    }
  }

  public async findAll(): Promise<Result<IElevatorDTO[]>> {
    try {
      const listOrError = await this.elevatorRepo.findAll();

      if (listOrError.length === 0) {
        return Result.fail<IElevatorDTO[]>("No elevators found");
      }
      const listResult = listOrError.map((elevator) => ElevatorMap.toDTO(elevator));

      return Result.ok<IElevatorDTO[]>(listResult);
    } catch (err) {
      // Handle errors here if needed.
      throw Result.fail<IElevatorDTO>(err);
    }
  }

}
