import { Mapper } from "../core/infra/Mapper";
import { PlanningElevator } from "../domain/planning/planningElevator";
import { IPlanningElevatorDTO } from "../dto/IPlanningElevatorDTO";

export class PlanningElevatorMapper extends Mapper<PlanningElevator> {
    static toDTO(planningElevator) {
        return {
            building: planningElevator.building,
            floors: planningElevator.floors
        } as IPlanningElevatorDTO;
    }
}
