import { TaskType } from "../domain/taskType/taskType";

export interface IRobotTypeDTO {
  id: string,
  name: string,
  taskTypes: string[],
  robotTypeModel: string,
  brand: string
}
