import { Task } from "./task";

export interface SurveillanceTask extends Task {
  emergencyNumber : string,
  floorId : string,
}
