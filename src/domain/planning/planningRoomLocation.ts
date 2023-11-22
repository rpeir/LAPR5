import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface PlanningRoomLocationProps {
  floor: string,
  line: number,
  column: number,
  room: string,
}

export class PlanningRoomLocation extends ValueObject<PlanningRoomLocationProps> {
  get floor(): string {
    return this.props.floor;
  }

  get line(): number {
    return this.props.line;
  }

  get column(): number {
    return this.props.column;
  }

  get room(): string {
    return this.props.room;
  }

  constructor(props: PlanningRoomLocationProps) {
    super(props);
  }

  public static create(props: PlanningRoomLocationProps) {
    const guardedProps = [
      { argument: props.floor, argumentName: "floor" },
      { argument: props.line, argumentName: "line" },
      { argument: props.column, argumentName: "column" },
      { argument: props.room, argumentName: "room" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<PlanningRoomLocation>(guardResult.message);
    }
    return Result.ok<PlanningRoomLocation>(new PlanningRoomLocation(props));
  }
}
