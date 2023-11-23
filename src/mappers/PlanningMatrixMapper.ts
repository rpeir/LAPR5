import { Mapper } from "../core/infra/Mapper";
import { PlanningMatrix } from "../domain/planning/planningMatrix";
import { IPlanningMatrixDTO } from "../dto/IPlanningMatrixDTO";

export class PlanningMatrixMapper extends Mapper<PlanningMatrixMapper> {
  public static toDTO(planningMatrixCell: PlanningMatrix) {
    return {
      maxLines: planningMatrixCell.maxLines,
      maxColumns: planningMatrixCell.maxColumns,
      matrix: planningMatrixCell.matrix,
    } as IPlanningMatrixDTO;
  }
}
