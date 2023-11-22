import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { ValueObject } from "../../core/domain/ValueObject";

interface PathBetweenFloors {
  element: string;
  floorSource: string;
  floorDestination: string;
}


interface PathProps {
  buildings: string[];
  paths: PathBetweenFloors[];
}


export class Path extends ValueObject<PathProps> {
  get buildings(): string[] {
    return this.props.buildings;
  }

  get paths(): PathBetweenFloors[] {
    return this.props.paths;
  }

  private constructor(props: PathProps) {
    super(props);
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
    });

    return Result.ok<Path>(path);
  }
}
