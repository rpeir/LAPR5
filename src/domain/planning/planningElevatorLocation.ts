import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface PlanningElevatorLocationProps {
  floor: string;
  column: number;
  line: number;
}

export class PlanningElevatorLocation extends ValueObject<PlanningElevatorLocationProps> {

  get floor(): string {
    return this.props.floor;
  }

  get column(): number {
    return this.props.column;
  }

  get line(): number {
    return this.props.line;
  }

  constructor(props: PlanningElevatorLocationProps) {
    super(props);
  }

  public static create(props: PlanningElevatorLocationProps) {
    const guardedProps = [
      { argument: props.floor, argumentName: "floor" },
      { argument: props.column, argumentName: "column" },
      { argument: props.line, argumentName: "line" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<PlanningElevatorLocation>(guardResult.message);
    }

    return Result.ok<PlanningElevatorLocation>(new PlanningElevatorLocation(props));
  }
}
