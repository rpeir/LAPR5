import {Repo} from "../../core/infra/Repo";
import {Building} from "../../domain/building";

export default interface IBuildingRepo extends Repo<Building>{
  save(building:Building): Promise<Building>;
  findByDesignation(designation: string): Promise<Building>;
  findByCode(code: number): Promise<Building>;
  findById(buildingId: |string): Promise<Building>;
}
