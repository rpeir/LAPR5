import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { ValueObject } from "../../core/domain/ValueObject";

interface PlanningElevatorProps {
  building: string,
  floors: string[]
}

export class PlanningElevator extends ValueObject<PlanningElevatorProps> {
  get building(): string {
    return this.props.building;
  }

  get floors(): string[] {
    return this.props.floors;
  }

  constructor(props: PlanningElevatorProps) {
    super(props);
  }


  public static create(props: PlanningElevatorProps, id?: UniqueEntityID) {
    const guardedProps = [
      { argument: props.building, argumentName: "building" },
      { argument: props.floors, argumentName: "floors" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<PlanningElevator>(guardResult.message);
    }
    return Result.ok<PlanningElevator>(new PlanningElevator({ ...props }));
  }
}
