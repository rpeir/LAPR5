import { Pathway } from "../../domain/pathway/pathway";
import { Repo } from "../../core/infra/Repo";
import { PathwayID } from "../../domain/pathway/pathwayID";
import { Floor } from "../../domain/floor/floor";

export default interface IPathwayRepo extends Repo<Pathway> {
  save(pathway: Pathway): Promise<Pathway>;

  findById(pathwayId: PathwayID | string): Promise<Pathway>;

  findAll(sourceBuilding:string,destinationBuilding:string): Promise<Pathway[]>;

  existsPathwayBetweenFloors(floor1 : Floor, floor2: Floor) : Promise<boolean>;

  findPathwayBetweenFloors(floorSource, floorDestination): Promise<Pathway>;

  findByBuildingId(buildingId:string):Promise<Pathway[]>;

}
