import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PlanningMatrixProps {
  maxLines: number,
  maxColumns: number,
  matrix: {
    line: number,
    column: number,
    value: number
  }[]
}

export class PlanningMatrix extends ValueObject<PlanningMatrixProps> {


  get maxLines(): number {
    return this.props.maxLines;
  }

  get maxColumns(): number {
    return this.props.maxColumns;
  }

  get matrix(): {
    line: number,
    column: number,
    value: number
  }[] {
    return this.props.matrix;
  }

  constructor(props: PlanningMatrixProps) {
    super(props);
  }

  public static create(props: PlanningMatrixProps) {
    const guardedProps = [
      { argument: props.maxLines, argumentName: 'maxLines' },
      { argument: props.maxColumns, argumentName: 'maxColumns' },
      { argument: props.matrix, argumentName: 'matrix' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<PlanningMatrix>(guardResult.message);
    }
    return Result.ok<PlanningMatrix>(new PlanningMatrix({ ...props }));
  }
}
