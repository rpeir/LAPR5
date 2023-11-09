import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface PlanningElevatorProps {
  building: string,
  floors: string[]
}

export class PlanningElevator extends AggregateRoot<PlanningElevatorProps> {
  get building(): string {
    return this.props.building;
  }

  get floors(): string[] {
    return this.props.floors;
  }

  constructor(props: PlanningElevatorProps, id: UniqueEntityID) {
    super(props, id);
  }


  public static create(props: PlanningElevatorProps, id?: UniqueEntityID) {
    const guardedProps = [
      { argument: props.building, argumentName: "building" },
      { argument: props.floors, argumentName: "floors" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<PlanningElevator>(guardResult.message);
    } else {
      const planningFloor = new PlanningElevator({ ...props }, id);
    }
    return Result.ok<PlanningElevator>(new PlanningElevator({ ...props }, id));
  }
}
