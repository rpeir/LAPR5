import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { BuildingCode } from './BuildingCode';

interface BuildingProps {
  code: BuildingCode;
  designation: string;
  description: string;
  length: number;
  width: number;
  height: number;
}
export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }
  get code(): BuildingCode {
    return this.props.code;
  }
  get designation(): string {
    return this.props.designation;
  }
  get description(): string {
    return this.props.description;
  }
  get length(): number {
    return this.props.length;
  }
  get width(): number {
    return this.props.width;
  }
  get height(): number {
    return this.props.height;
  }
  set code(value: BuildingCode) {
    this.props.code = value;
  }
  set length(value: number) {
    this.props.length = value;
  }
  set width(value: number) {
    this.props.width = value;
  }
  set height(value: number) {
    this.props.height = value;
  }
  set designation(value: string) {
    this.props.designation = value;
  }
  set description(value: string) {
    this.props.description = value;
  }
  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: BuildingProps, id?: UniqueEntityID): Result<Building> {
    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.designation, argumentName: 'designation' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.length, argumentName: 'length' },
      { argument: props.width, argumentName: 'width' },
      { argument: props.height, argumentName: 'height' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Building>(guardResult.message);
    } else {
      const user = new Building(
        {
          ...props,
        },
        id,
      );

      return Result.ok<Building>(user);
    }
  }
}
