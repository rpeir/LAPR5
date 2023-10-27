import { Building } from "../domain/building/building";
import { Floor } from "../domain/floor";

export interface IPathwayPersistence {
  domainId: string;
  buildingSource: string;
  buildingDestination: string;
  floorSource: string;
  floorDestination: string;
  description: string;
}
