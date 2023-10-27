import { TaskType } from "../domain/taskType";

export interface IRobotTypeDTO {
  id: string,
  name: string,
  taskTypes: string[],
  robotTypeModel: string,
  brand: string
}
