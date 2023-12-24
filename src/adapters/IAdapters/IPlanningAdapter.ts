import { Result } from "../../core/logic/Result";
import { IPathDTO } from "../../dto/IPathDTO";
import { PlanningTask } from "../../domain/planning/planningTask";

export default interface IPlanningAdapter {
  getPathLessBuildings(floorSource: string, floorDestination: string): Promise<Result<IPathDTO>>;
  getPathLessElevators(floorSource: string, floorDestination: string): Promise<Result<IPathDTO>>;
  getPathLessElevatorsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string): Promise<Result<IPathDTO>>;
  getPathLessBuildingsRoomToRoom(floorSource: string, floorDestination: string, roomSource: string, roomDestination: string): Promise<Result<IPathDTO>>;
  getTaskSequence(nrGenerations: number, stabilizationCriteriaValue: number, idealCost: number, planningTask: PlanningTask[]) :Promise<Result<PlanningTask[]>>;
}
