import { Mapper } from "../core/infra/Mapper";
import { IPlanningRoomLocationDTO } from "../dto/IPlanningRoomLocationDTO";
import { PlanningRoomLocation } from "../domain/planning/planningRoomLocation";

export class PlanningRoomLocationMapper extends Mapper<PlanningRoomLocationMapper> {
  static toDTO(planningRoomLocation: PlanningRoomLocation) {
    return {
      floor: planningRoomLocation.floor,
      column: planningRoomLocation.column,
      line: planningRoomLocation.line,
      room: planningRoomLocation.room
    } as IPlanningRoomLocationDTO;
  }
}
