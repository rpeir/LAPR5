import { ITaskRequestDTO } from "./ITaskRequestDTO";

export interface ISurveillanceTaskRequestDTO extends ITaskRequestDTO {
  emergencyNumber : string,
  floorId : string,
}
