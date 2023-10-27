import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { Building } from "./building/building";
import { Floor } from "./floor";

interface PathwayProps {
  buildingSource: Building,
  buildingDestination: Building,
  floorSource: Floor,
  floorDestination: Floor,
  description: string;
}

export class Pathway extends AggregateRoot<PathwayProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): string {
    return this.props.description;
  }

  set description(v: string) {
    this.props.description = v;
  }

  get buildingSource(): Building {
    return this.props.buildingSource;
  }

  get buildingDestination(): Building {
    return this.props.buildingDestination;
  }

  get floorSource(): Floor {
    return this.props.floorSource;
  }

  get floorDestination(): Floor {
    return this.props.floorDestination;
  }

  private constructor(props: PathwayProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PathwayProps, id?: UniqueEntityID): Result<Pathway> {

    const guardedProps = [
      { argument: props.description, argumentName: "description" },
      { argument: props.buildingSource, argumentName: "buildingSource" },
      { argument: props.buildingDestination, argumentName: "buildingDestination" },
      { argument: props.floorSource, argumentName: "floorSource" },
      { argument: props.floorDestination, argumentName: "floorDestination" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Pathway>(guardResult.message);
    } else {
      const user = new Pathway({
        ...props
      }, id);

      return Result.ok<Pathway>(user);
    }
  }
}
