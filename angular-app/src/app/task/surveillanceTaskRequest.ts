import { TaskRequest } from "./taskRequest";

export interface ISurveillanceTaskRequestDTO extends TaskRequest {
  emergencyNumber : string,
  floorId : string,
}
