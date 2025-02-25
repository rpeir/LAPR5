import { Mapper } from '../core/infra/Mapper';
import { Floor } from '../domain/floor/floor';
import { IFloorDTO } from '../dto/IFloorDTO';
import { Container } from 'typedi';
import BuildingRepo from '../repos/buildingRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class FloorMapper extends Mapper<Floor> {
  public static toDTO(floor: Floor) {
    if (floor.floorMap === undefined) {
      return {
        domainId: floor.id.toString(),
        building: floor.building.designation,
        description: floor.description,
        floorNr: floor.floorNr,
      } as IFloorDTO;
    }
    return {
      domainId: floor.id.toString(),
      building: floor.building.designation,
      description: floor.description,
      floorNr: floor.floorNr,
      floorMap: {
        maze: floor.floorMap.maze,
        ground: floor.floorMap.ground,
        player: floor.floorMap.player,
        wall: floor.floorMap.wall,
      },
    } as IFloorDTO;
  }

  public static async toDomain(raw: any) {
    const repo = Container.get(BuildingRepo);
    const building = await repo.findById(raw.building);
    // floorMap is optional
    const floorMap = raw.floorMap ? raw.floorMap : undefined;

    const floorOrError = Floor.create(
      {
        building: building,
        description: raw.description,
        floorNr: raw.floorNr,
        floorMap: floorMap,
      },
      new UniqueEntityID(raw.domainId),
    );

    floorOrError.isFailure ? console.log(floorOrError.error) : '';

    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toPersistence(floor: Floor) {
    const raw = {
      domainId: floor.id.toString(),
      building: floor.building.id.toString(),
      description: floor.description,
      floorNr: floor.floorNr,
      floorMap: floor.floorMap,
    };
    return raw;
  }
}
