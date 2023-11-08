import { TaskType } from "../domain/task/taskType";

export interface IRobotTypeDTO {
  id: string,
  name: string,
  taskTypes: string[],
  robotTypeModel: string,
  brand: string
}
