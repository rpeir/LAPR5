import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { Floor } from "../floor"
import { RoomCategory } from "./roomCategory";
import { FloorId } from "../floorId";
import { BuildingCode } from "../BuildingCode";

interface RoomProps {
    name : string;
    description : string;
    category : RoomCategory;
    floor : number;
    building : BuildingCode;
}

export class Room extends AggregateRoot<RoomProps>{

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get category(): RoomCategory {
    return this.props.category;
  }

  get floor(): number{
    return this.props.floor;
  }

  get building(): BuildingCode{
    return this.props.building;
  }

  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RoomProps, id?: UniqueEntityID): Result<Room>{
    const guardedProps = [
      {argument: props.name, argumentName: 'name'},
      {argument: props.description, argumentName: 'description'},
      {argument: props.category, argumentName: 'category'},
      {argument: props.floor, argumentName: 'floor'}
    ];
    const guardDescriptionLength = Guard.inRange(props.description.length,1,250,"roomDescriptionLength");
    const guardNameLength = Guard.inRange(props.name.length,1,50,"roomNameLength");
    const guardProps = Guard.againstNullOrUndefinedBulk(guardedProps);

    const guardResult = Guard.combine([guardProps,guardDescriptionLength,guardNameLength]);

    if (!guardResult.succeeded) {
      return Result.fail<Room>(guardResult.message);
    } else{
      const room = new Room({
        ...props
      },id);
      return Result.ok<Room>(room)
    }

  }
}
