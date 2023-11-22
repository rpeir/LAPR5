import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PlanningMatrixCellProps {
  line: number,
  column: number,
  value: number
}

export class PlanningMatrixCell extends ValueObject<PlanningMatrixCellProps> {


  get line(): number {
    return this.props.line;
  }

  get column(): number {
    return this.props.column;
  }

  get value(): number {
    return this.props.value;
  }

  constructor(props: PlanningMatrixCellProps) {
    super(props);
  }

  public static create(props: PlanningMatrixCellProps) {
    const guardedProps = [
      { argument: props.line, argumentName: "line" },
      { argument: props.column, argumentName: "column" },
      { argument: props.value, argumentName: "value" }
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<PlanningMatrixCell>(guardResult.message);
    }
    return Result.ok<PlanningMatrixCell>(new PlanningMatrixCell({ ...props }));
  }
}
