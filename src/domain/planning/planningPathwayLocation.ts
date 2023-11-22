import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PlanningPathwayLocationProps {
  floorSource: string;
  floorDestination: string;
  column: number;
  line: number;
}

export class PlanningPathwayLocation extends ValueObject<PlanningPathwayLocationProps> {
  get floorSource(): string {
    return this.props.floorSource;
  }

  get floorDestination(): string {
    return this.props.floorDestination;
  }

  get column(): number {
    return this.props.column;
  }

  get line(): number {
    return this.props.line;
  }

  private constructor(props: PlanningPathwayLocationProps) {
    super(props);
  }

  public static create(props: PlanningPathwayLocationProps) {
    const guardedProps = [
      { argument: props.floorSource, argumentName: "floorSource" },
      { argument: props.floorDestination, argumentName: "floorDestination" },
      { argument: props.column, argumentName: "column" },
      { argument: props.line, argumentName: "line" }
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<PlanningPathwayLocation>(guardResult.message);
    }
    return Result.ok<PlanningPathwayLocation>(new PlanningPathwayLocation(props));
  }
}
