import { Mapper } from "../core/infra/Mapper";
import { PlanningElevatorLocation } from "../domain/planning/planningElevatorLocation";
import { IPlanningElevatorLocationDTO } from "../dto/IPlanningElevatorLocationDTO";

export class IPlanningElevatorLocationMapper extends Mapper<PlanningElevatorLocation>{
  public static toDTO(planningElevatorLocation: PlanningElevatorLocation) {
    return {
      floor: planningElevatorLocation.floor,
      column: planningElevatorLocation.column,
      line: planningElevatorLocation.line,
    } as IPlanningElevatorLocationDTO;
  }
}
