import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { ValueObject } from "../../core/domain/ValueObject";

interface PlanningFloorProps  {
  building: string,
  floors: string[]
}

export class PlanningFloor extends ValueObject<PlanningFloorProps>{
  get building(): string {
    return this.props.building;
  }

  get floors(): string[] {
    return this.props.floors;
  }

  constructor(props: PlanningFloorProps) {
    super(props);
  }


  public static create(props: PlanningFloorProps, id?: UniqueEntityID) {
    const guardedProps = [
      { argument: props.building, argumentName: "building" },
      { argument: props.floors, argumentName: "floors" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<PlanningFloor>(guardResult.message);
    } else {
      const planningFloor = new PlanningFloor({...props});
    }
    return Result.ok<PlanningFloor>(new PlanningFloor({...props}));
  }


}
