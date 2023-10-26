import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor";

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  findByBuildingIdAndFloorNr(buildingId: string, floorNr: number): Promise<Floor>;
  findById(id: string): Promise<Floor>;
}
