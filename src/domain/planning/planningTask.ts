import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface PlanningTaskProps {
  pickupRoom: string;
  deliveryRoom: string;
  pickupFloor: string;
  deliveryFloor: string;
}

export class PlanningTask extends AggregateRoot<PlanningTaskProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get pickupRoom(): string {
    return this.props.pickupRoom;
  }

  get deliveryRoom(): string {
    return this.props.deliveryRoom;
  }

  get pickupFloor(): string {
    return this.props.pickupFloor;
  }

  get deliveryFloor(): string {
    return this.props.deliveryFloor;
  }

  private constructor(props: PlanningTaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PlanningTaskProps, id?: UniqueEntityID) : Result<PlanningTask> {
    const guardedProps = [
      { argument: props.pickupRoom, argumentName: "pickupRoom" },
      { argument: props.deliveryRoom, argumentName: "deliveryRoom" },
      { argument: props.pickupFloor, argumentName: "pickupFloor" },
      { argument: props.deliveryFloor, argumentName: "deliveryFloor" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<PlanningTask>(guardResult.message);
    } else {
      const planningTask = new PlanningTask({
        ...props
      }, id);
    }
    return Result.ok<PlanningTask>(new PlanningTask(props, id));
  }

}
