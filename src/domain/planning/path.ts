import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PathBetweenFloors {
  element: string;
  floorSource: string;
  floorDestination: string;
}


interface PathProps {
  buildings: string[];
  paths: PathBetweenFloors[];
}


export class Path extends Entity<PathProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get buildings(): string[] {
    return this.props.buildings;
  }

  get paths(): PathBetweenFloors[] {
    return this.props.paths;
  }

  private constructor(props: PathProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PathProps, id?: UniqueEntityID): Result<Path> {
    const guardedProps = [
      { argument: props.buildings, argumentName: 'buildings' },
      { argument: props.paths, argumentName: 'paths' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<Path>(guardResult.message);
    }

    const path = new Path({
      ...props
    }, id);

    return Result.ok<Path>(path);
  }
}
