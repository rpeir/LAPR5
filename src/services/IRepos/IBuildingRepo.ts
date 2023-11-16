import { Repo } from '../../core/infra/Repo';
import { Building } from '../../domain/building/building';
import { BuildingCode } from '../../domain/building/BuildingCode';
import {FloorMapper} from "../../mappers/FloorMapper";

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  updateOne(building: Building): Promise<Building>;
  findByDesignation(designation: string): Promise<Building>;
  findByCode(buildingCode: BuildingCode | string): Promise<Building>;
  findById(buildingId: string): Promise<Building>;
  findAll(): Promise<Building[]>;
}
