import { Mapper } from "../core/infra/Mapper";
import { PlanningFloor } from "../domain/planningFloor";
import { IPlanningFloorDTO } from "../dto/IPlanningFloorDTO";

export class PlanningFloorMapper extends Mapper<PlanningFloor>{
  public static toDTO(planningFloor: PlanningFloor): any {
    return {
      building: planningFloor.building,
      floors: planningFloor.floors
    } as IPlanningFloorDTO
  }

}
