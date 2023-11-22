import { Mapper } from "../core/infra/Mapper";
import { IPlanningPathwayLocationDTO } from "../dto/IPlanningPathwayLocationDTO";
import { PlanningPathwayLocation } from "../domain/planning/planningPathwayLocation";

export class PlanningPathwayLocationMapper extends Mapper<PlanningPathwayLocationMapper> {
  static toDTO(planningPathwayLocation: PlanningPathwayLocation) {
    return {
      floorSource: planningPathwayLocation.floorSource,
      floorDestination: planningPathwayLocation.floorDestination,
      column: planningPathwayLocation.column,
      line: planningPathwayLocation.line
    } as IPlanningPathwayLocationDTO;
  }
}
