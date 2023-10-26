import {Mapper} from "../core/infra/Mapper";
import {Elevator} from "../domain/elevator";
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
        code: elevator.code.toString(),
        designation: elevator.designation,
        buildingDesignation: elevator.buildingDesignation,
        floorsServed:  floors ,
        } as IElevatorDTO
    }
  public static async toDomain(raw: any): Promise<Elevator>{
    const elevatorOrError= Elevator.create({
      code: raw.code,
      designation: raw.designation,
      buildingDesignation: raw.buildingDesignation,
      floorsServed: raw.floorsServed.map(floor=>+floor),
    },new UniqueEntityID(raw.domainId))
    elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';
    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }
  public static toPersistence (elevator: Elevator): any{
    const a= {
      domainId: elevator.id.toString(),
      code: elevator.code.toString(),
      designation: elevator.designation,
      buildingDesignation: elevator.buildingDesignation,
      floorsServed: elevator.floorsServed.map(floor=>floor.floorNr.toString()),
    }
    return a;
  }
}
