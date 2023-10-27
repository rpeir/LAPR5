import {Inject, Service} from "typedi";
import IElevatorRepo from "../services/IRepos/IElevatorRepo";
import {Model} from "mongoose";
import {IElevatorPersistence} from "../dataschema/IElevatorPersistence";
import {Document, MongoServerError} from "mongodb";
import {Elevator} from "../domain/elevator/elevator";
import {ElevatorMap} from "../mappers/ElevatorMap";
import {Building} from "../domain/building/building";
import elevatorSchema from "../persistence/schemas/elevatorSchema";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

@Service()
export default class ElevatorRepo implements IElevatorRepo{
  private models: any;
  constructor(@Inject('elevatorSchema')private elevatorSchema: Model<IElevatorPersistence & Document>) {}
    private createBaseQuery(): any {
    return {
      where: {}
    };
  }
  public async save(elevator: Elevator): Promise<Elevator>{
    const query= {domainId: elevator.id.toString()};
    const elevatorDocument=await this.elevatorSchema.findOne(query);
    try{
      if(elevatorDocument===null){
        const rawElevator: any = ElevatorMap.toPersistence(elevator);
        const elevatorCreated=await this.elevatorSchema.create(rawElevator);
        return ElevatorMap.toDomain(elevatorCreated);
      }else{
        let floors;
        try {
          floors = elevator.floorsServed.map(floor=>floor.floorNr.toString());
        } catch (err) {
          floors = elevator.floorsServed;
        }
        elevatorDocument.code= elevator.code;
        elevatorDocument.designation= elevator.designation;
        elevatorDocument.buildingDesignation= elevator.buildingDesignation;
        elevatorDocument.floorsServed= floors;
        elevatorDocument.brand= elevator.brand;
        elevatorDocument.modelE= elevator.modelE;
        elevatorDocument.serialNumber= elevator.serialNumber;
        elevatorDocument.description= elevator.description;
        await elevatorDocument.save();
        return elevator;
      }
    }catch (err){
      if (err instanceof MongoServerError) {
        if (err.code == 11000) {
          throw `Already exists elevator with ${JSON.stringify(err.keyValue)}`;
        }
      }
        throw err;
    }
  }
    public async findById(domainId: UniqueEntityID|string): Promise<Elevator>{
        const query={domainId: domainId};
        const elevatorRecord = await this.elevatorSchema.findOne(query);
        if (elevatorRecord != null) {
        return ElevatorMap.toDomain(elevatorRecord);
        }else{
        return null;
        }
    }
    public async findByDesignation(designation: string): Promise<Elevator>{
        const query={designation: designation};
        const elevatorRecord = await this.elevatorSchema.findOne(query);
        if (elevatorRecord != null) {
        return ElevatorMap.toDomain(elevatorRecord);
        }else{
        return null;
        }
    }
    public async exists(elevator: Elevator): Promise<boolean>{
        const idx=elevator instanceof Elevator ? (<Elevator> elevator) : elevator;
        const query = { elevatorCode: idx};
        const tipoRobotDocument = await this.elevatorSchema.findOne( query);
        return !!tipoRobotDocument === true;
    }
    public async findLatestElevatorByBuilding(buildingDesignation: String): Promise<Elevator>{
      const query={buildingDesignation: buildingDesignation};
        const elevatorRecord = await this.elevatorSchema.findOne(query).sort({code:-1});
        if (elevatorRecord != null) {
        return ElevatorMap.toDomain(elevatorRecord);
        } else {
        return null;
        }
    }
    public async listElevators(buildingDesignation: String): Promise<Elevator[]>{
      const query={buildingDesignation:buildingDesignation};
      const results=await this.elevatorSchema.find(query);
      if(results!=null){
          return Promise.all(results.map(result =>ElevatorMap.toDomain(result)));
      } else{
          return null;
      }
    }
}
