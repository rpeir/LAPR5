import { Mapper } from '../core/infra/Mapper';
import { Building } from '../domain/building/building';
import { IBuildingDTO } from '../dto/IBuildingDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { BuildingCode } from "../domain/building/BuildingCode";

export class BuildingMap extends Mapper<Building> {

  public static toDTO(building: Building): IBuildingDTO {
    return {
      domainId: building.id.toString(),
      code: building.code.value,
      designation: building.designation,
      description: building.description,
      length: building.length,
      width: building.width,
      height: building.height,
    } as IBuildingDTO;
  }
  public static async toDomain(raw: any): Promise<Building> {
    const buildingCode = BuildingCode.create(raw.code);
    const buildingOrError = Building.create(
      {
        code: buildingCode.getValue(),
        designation: raw.designation,
        description: raw.description,
        length: raw.length,
        width: raw.width,
        height: raw.height,
      },
      new UniqueEntityID(raw.domainId),
    );
    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }
  public static toPersistence(building: Building): any {
    const a = {
      domainId: building.id.toString(),
      code: building.code.value,
      designation: building.designation,
      description: building.description,
      length: building.length,
      width: building.width,
      height: building.height,
    };
    return a;
  }
}
