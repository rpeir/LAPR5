import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor";
import {Building} from "../../domain/building";

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;

  findById(id: string): Promise<Floor>;

  findByBuildingAndNumber(domainID: string, number: number): Promise<Floor>;
}
