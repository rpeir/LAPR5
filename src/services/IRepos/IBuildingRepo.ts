import {Repo} from "../../core/infra/Repo";
import {Building} from "../../domain/building";

export default interface IBuildingRepo extends Repo<Building>{
  save(building:Building): Promise<Building>;
  findByDesignation(desigantion: string): Promise<Building>;
  findByCode(code: number): Promise<Building>;
}
