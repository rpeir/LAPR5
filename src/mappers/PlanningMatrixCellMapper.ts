import { Mapper } from "../core/infra/Mapper";
import { IPlanningMatrixCellDTO } from "../dto/IPlanningMatrixCellDTO";
import { PlanningMatrixCell } from "../domain/planning/planningMatrixCell";

export class PlanningMatrixCellMapper extends Mapper<PlanningMatrixCellMapper> {
  public static toDTO(planningMatrixCell: PlanningMatrixCell) {
    return {
      line: planningMatrixCell.line,
      column: planningMatrixCell.column,
      value: planningMatrixCell.value
    } as IPlanningMatrixCellDTO;
  }
}
