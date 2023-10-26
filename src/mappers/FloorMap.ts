import { Mapper } from "../core/infra/Mapper";
import { Floor } from "../domain/floor";
import { IFloorDTO } from "../dto/IFloorDTO";
import { Container } from "typedi";
import BuildingRepo from "../repos/buildingRepo";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class FloorMap extends Mapper<Floor> {
  public static toDTO(floor: Floor) {
    return {
      building: floor.building.id.toString(),
      description: floor.description,
      floorNr: floor.floorNr
    } as IFloorDTO;
  }

  public static async toDomain(raw: any) {
    const repo = Container.get(BuildingRepo);
    const building = await repo.findById(raw.building);

    const floorOrError = Floor.create({
      building: building,
      description: raw.description,
      floorNr: raw.floorNr
    }, new UniqueEntityID(raw.domainId));

    floorOrError.isFailure ? console.log(floorOrError.error) : "";

    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toPersistence(floor: Floor) {
    const raw = {
      domainId: floor.id.toString(),
      building: floor.building.id.toString(),
      description: floor.description,
      floorNr: floor.floorNr
    };
    return raw;
  }
}
