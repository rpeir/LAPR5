import { ITaskDTO } from "./ITaskDTO";

export interface ISurveillanceTaskDTO extends ITaskDTO {
  emergencyNumber : string,
  floorId : string,
}
