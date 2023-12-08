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
import { Floor } from "../domain/floor/floor";
import { Building } from "../domain/building/building";

@Service()
export default class ElevatorService implements IElevatorService{
  constructor(
    @Inject(config.repos.elevator.name) private  elevatorRepo: IElevatorRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
  ) {
  }

  private async getNewElevatorCode(buildingDesignation: string): Promise<number> {
    const latestElevatorCode = await this.elevatorRepo.findLatestElevatorByBuilding(buildingDesignation);
    let newElevatorCode = 1;
    if (latestElevatorCode != null) {
      newElevatorCode = +latestElevatorCode.code + 1;
    }
    return newElevatorCode;
  }
  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try{

      const elevatorDesignation=elevatorDTO.designation;
      const elevatorBuildingDesignation=elevatorDTO.buildingDesignation;
      const building=await this.buildingRepo.findByDesignation(elevatorBuildingDesignation);
      let newElevatorCode = this.getNewElevatorCode(building.designation);

      const elevatorFloorsServed = await Promise.all(elevatorDTO.floorsServed.map(floor => this.floorRepo.findByBuildingAndNumber(building.id.toString(), +floor)));

      try { elevatorFloorsServed.map(floor => {if (floor == null) throw new Error("Floor not found")});}
      catch (err) {return Result.fail<IElevatorDTO>(err.message);
      }

      const elevatorOrError = Elevator.create({

          code:await newElevatorCode,
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
      let elevator=elevatorOrError;
      let floorsServed : Floor[];
      let building : Building;
      let code : number;
      if (elevatorDTO.buildingDesignation && elevatorDTO.buildingDesignation != elevator.buildingDesignation) {
        building = await this.buildingRepo.findByDesignation(elevatorDTO.buildingDesignation);
        code = await this.getNewElevatorCode(elevatorDTO.buildingDesignation);
      } else if (elevatorDTO.floorsServed) {
        building = await this.buildingRepo.findByDesignation(elevator.buildingDesignation);
      }
      if (building) {
        floorsServed = await Promise.all(elevatorDTO.floorsServed.map(floor => this.floorRepo.findByBuildingAndNumber(building.id.toString(), +floor)));
        for (let i = 0; i < floorsServed.length; i++) {
          if (floorsServed[i] == null) {
            return Result.fail<IElevatorDTO>(`Floor ${elevatorDTO.floorsServed[i]} not found`);
          }
        }
      }
      let updatedElevator = elevator.update({
        code: code ?? code,
        designation: elevatorDTO.designation,
        buildingDesignation: elevatorDTO.buildingDesignation,
        floorsServed: floorsServed ?? floorsServed,
        brand: elevatorDTO.brand,
        modelE: elevatorDTO.modelE,
        serialNumber: elevatorDTO.serialNumber,
        description: elevatorDTO.description,
      })

      if(updatedElevator.isFailure){
        return Result.fail<IElevatorDTO>(updatedElevator.errorValue());
      } else {
        elevator=updatedElevator.getValue();
      }

      elevator=await this.elevatorRepo.save(elevator);
      const elevatorDTOResult =ElevatorMap.toDTO(elevator) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOResult);
    } catch (err){
      throw Result.fail<IElevatorDTO>(err);
    }
  }
  public async replaceElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      let elevator=await this.elevatorRepo.findById(elevatorDTO.id);
      if(elevator==null){
        return await this.createElevator(elevatorDTO);
      }
      let code : number;
      if (elevatorDTO.buildingDesignation != elevator.buildingDesignation) {
        code = await this.getNewElevatorCode(elevatorDTO.buildingDesignation);
      }
      const floorsServed = await Promise.all(elevatorDTO.floorsServed.map(floor => this.floorRepo.findByBuildingAndNumber(elevatorDTO.buildingDesignation, +floor)));
      const updatedElevator = elevator.update({
        code: code ?? code,
        designation: elevatorDTO.designation,
        buildingDesignation: elevatorDTO.buildingDesignation,
        floorsServed: floorsServed,
        brand: elevatorDTO.brand,
        modelE: elevatorDTO.modelE,
        serialNumber: elevatorDTO.serialNumber,
        description: elevatorDTO.description,
      })

      if(updatedElevator.isFailure){
        return Result.fail<IElevatorDTO>(updatedElevator.errorValue());
      } else {
        elevator=updatedElevator.getValue();
      }

      elevator=await this.elevatorRepo.save(elevator);
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
