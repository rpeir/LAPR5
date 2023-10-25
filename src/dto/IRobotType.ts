import { TaskType } from "../domain/taskType";

export interface IRobotType {
  name: string,
  taskTypes: string[],
  robotTypeModel: string,
  brand: string
}
