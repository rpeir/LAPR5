import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { Building } from '../building/building';
import { FloorMapStructure } from './floorMapStructure';

interface FloorProps {
  description: string;
  building: Building;
  floorNr: number;
  floorMap?: FloorMapStructure; // Updated the type to FloorMapper
}

export class Floor extends AggregateRoot<FloorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): string {
    return this.props.description;
  }

  get building(): Building {
    return this.props.building;
  }

  get floorNr(): number {
    return this.props.floorNr;
  }

  get floorMap(): FloorMapStructure | undefined {
    // Updated the return type to FloorMapper | undefined
    return this.props.floorMap;
  }

  set description(value: string) {
    this.props.description = value;
  }

  set floorNr(value: number) {
    this.props.floorNr = value;
  }

  set floorMap(value: FloorMapStructure | undefined) {
    // Updated the type to FloorMapper | undefined
    this.props.floorMap = value;
  }

  private constructor(props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FloorProps, id?: UniqueEntityID): Result<Floor> {
    const guardedProps = [
      { argument: props.description, argumentName: 'description' },
      { argument: props.floorNr, argumentName: 'floorNr' },
      { argument: props.building, argumentName: 'building' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Floor>(guardResult.message);
    } else {
      const user = new Floor(
        {
          ...props,
        },
        id,
      );

      return Result.ok<Floor>(user);
    }
  }

  equals(object?: Floor): boolean {
    return (
      this.id.equals(object.id) &&
      this.description == object.description &&
      this.floorNr == object.floorNr &&
      this.building.equals(object.building)
    );
  }
}
