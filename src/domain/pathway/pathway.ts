import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { Building } from "../building/building";
import { Floor } from "../floor/floor";

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
    const guardResult = this.validate(props);
    if (guardResult.isFailure) {
      return Result.fail<Pathway>(guardResult.error);
    } else {
      const user = new Pathway({
        ...props
      }, id);

      return Result.ok<Pathway>(user);
    }
  }

  public update(props: PathwayProps) : Result<Pathway> {
    let combinedProps : PathwayProps = {...this.props };

    for (let prop in props) {
      if (props[prop] != null || props[prop] != undefined) {
        combinedProps[prop] = props[prop];
      }
    }

    const guardResult = Pathway.validate(combinedProps);
    if (guardResult.isFailure) {
      return Result.fail<Pathway>(guardResult.error);
    } else {
      this.props.description = combinedProps.description;
      this.props.buildingSource = combinedProps.buildingSource;
      this.props.buildingDestination = combinedProps.buildingDestination;
      this.props.floorSource = combinedProps.floorSource;
      this.props.floorDestination = combinedProps.floorDestination;
      return Result.ok<Pathway>(this);
    }
  }

  private static validate(props: PathwayProps): Result<void> {
    const guardedProps = [
      { argument: props.description, argumentName: "description" },
      { argument: props.buildingSource, argumentName: "buildingSource" },
      { argument: props.buildingDestination, argumentName: "buildingDestination" },
      { argument: props.floorSource, argumentName: "floorSource" },
      { argument: props.floorDestination, argumentName: "floorDestination" }
    ];

    const guardNull = Guard.againstNullOrUndefinedBulk(guardedProps);

    const guardFloors = Guard.isTrue(!props.floorDestination.equals(props.floorSource), "Source and destination floors are the same");
    const guardBuildings = Guard.isTrue(!props.buildingDestination.id.equals(props.buildingSource.id), "Source and destination buildings are the same");
    const guardFloorsBuildings = Guard.isTrue(props.floorDestination.building.id.equals(props.buildingDestination.id), "Destination Floor's building and this building are not the same");
    const guardFloorsBuildings2 = Guard.isTrue(props.floorSource.building.id.equals(props.buildingSource.id), "Source Floor's building and this building are not the same");

    const guardResult = Guard.combine([guardFloors,guardBuildings,guardFloorsBuildings,guardFloorsBuildings2]);

    if (!guardNull.succeeded) {
      return Result.fail<void>(guardNull.message);
    } else if (!guardResult.succeeded) {
      return Result.fail<void>(guardResult.message);
    } else {
      return Result.ok<void>();
    }
  }
}
