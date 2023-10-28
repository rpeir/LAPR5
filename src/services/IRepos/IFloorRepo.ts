import { Repo } from '../../core/infra/Repo';
import { Floor } from '../../domain/floor';
import { Building } from '../../domain/building/building';

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  existsByBuildingAndNumber(building: string | number, number: number): Promise<boolean>;
  findByBuildingIdAndFloorNr(buildingId: string, floorNr: number): Promise<Floor>;
  findById(id: string): Promise<Floor>;
  findByBuildingId(buildingId: string): Promise<Floor[]>;
  findByBuildingAndNumber(domainID: string, number: number): Promise<Floor>;
  findBuildingByFloorMaxMin(max: number, min: number);
}