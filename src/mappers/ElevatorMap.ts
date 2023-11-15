import {Mapper} from "../core/infra/Mapper";
import {Elevator} from "../domain/elevator/elevator";
import {IElevatorDTO} from "../dto/IElevatorDTO";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

export class ElevatorMap extends Mapper<Elevator>{

  public static toDTO(elevator: Elevator): IElevatorDTO{
    let floors;
    try {
      floors = elevator.floorsServed.map(floor=>floor.floorNr.toString());
    } catch (err) {
      floors = elevator.floorsServed;
    }
    return {
        id: elevator.id.toString(),
        code: elevator.code.toString(),
        designation: elevator.designation,
        buildingDesignation: elevator.buildingDesignation,
        floorsServed:  floors ,
        brand: elevator.brand,
        modelE: elevator.modelE,
        serialNumber: elevator.serialNumber,
        description: elevator.description,
        } as IElevatorDTO
    }
  public static async toDomain(raw: any): Promise<Elevator>{
    const elevatorOrError= Elevator.create({
      code: raw.code,
      designation: raw.designation,
      buildingDesignation: raw.buildingDesignation,
      floorsServed: raw.floorsServed.map(floor=>+floor),
      brand: raw.brand,
      modelE: raw.modelE,
      serialNumber: raw.serialNumber,
      description: raw.description,
    },new UniqueEntityID(raw.domainId||raw.id))
    elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';
    if (elevatorOrError.isFailure) { // @ts-ignore
      throw new Error(elevatorOrError.error)
    }
    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }
  public static toPersistence (elevator: Elevator): any{
    let floors;
    try {
      floors = elevator.floorsServed.map(floor=>floor.floorNr.toString());
    } catch (err) {
      floors = elevator.floorsServed;
    }
    const a= {
      domainId: elevator.id.toString(),
      code: elevator.code.toString(),
      designation: elevator.designation,
      buildingDesignation: elevator.buildingDesignation,
      floorsServed: floors,
      brand: elevator.brand,
      modelE: elevator.modelE,
      serialNumber: elevator.serialNumber,
      description: elevator.description,
    }
    return a;
  }
}
