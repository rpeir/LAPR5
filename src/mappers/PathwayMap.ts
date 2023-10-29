import { Pathway } from "../domain/pathway";
import { Mapper } from "../core/infra/Mapper";
import BuildingRepo from "../repos/buildingRepo";
import FloorRepo from "../repos/floorRepo";
import { Container } from "typedi";

export class PathwayMap extends Mapper<Pathway> {
  public static toDTO(pathway: Pathway): any {
    return {
      domainId: pathway.id.toString(),
      buildingSource: pathway.buildingSource.designation,
      buildingDestination: pathway.buildingDestination.designation,
      floorSource: pathway.floorSource.floorNr,
      floorDestination: pathway.floorDestination.floorNr,
      description: pathway.description
    };
  }

  public static async toDomain(raw: any) {
    const buildingRepo = Container.get(BuildingRepo);
    const floorRepo = Container.get(FloorRepo);
    const buildingSource = await buildingRepo.findById(raw.buildingSource);
    const buildingDestination = await buildingRepo.findById(raw.buildingDestination);
    const floorSource = await floorRepo.findById( raw.floorSource);
    const floorDestination = await floorRepo.findById(raw.floorDestination);

    const pathwayOrError = Pathway.create({
      buildingSource: buildingSource,
      buildingDestination: buildingDestination,
      floorSource: floorSource,
      floorDestination: floorDestination,
      description: raw.description
    }, raw.domainId);

    pathwayOrError.isFailure ? console.log(pathwayOrError.error) : "";

    return pathwayOrError.isSuccess ? pathwayOrError.getValue() : null;
  }

  public static toPersistence(pathway: Pathway): any {
    return {
      domainId: pathway.id.toString(),
      buildingSource: pathway.buildingSource.id.toString(),
      buildingDestination: pathway.buildingDestination.id.toString(),
      floorSource: pathway.floorSource.id.toString(),
      floorDestination: pathway.floorDestination.id.toString(),
      description: pathway.description
    };
  }
}
