import { Mapper } from "../core/infra/Mapper";
import { PlanningPathway } from "../domain/planning/planningPathway";
import { IPlanningPathwayDTO } from "../dto/IPlanningPathwayDTO";

export class PlanningPathwayMapper extends Mapper<PlanningPathway>{
    static toDTO(planningPathway) {
        return {
            buildingSource: planningPathway.buildingSource,
            buildingDestination: planningPathway.buildingDestination,
            floorSource: planningPathway.floorSource,
            floorDestination: planningPathway.floorDestination
        } as IPlanningPathwayDTO;
    }
}
