import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";

interface FloorProps{
  description:string;
}
export class Floor extends AggregateRoot<FloorProps> {
  get id(): UniqueEntityID{
    return this._id;
  }
  get description():string{
    return this.props.description;
  }
  set description(value:string){
    this.props.description=value;
  }
  private constructor(props:FloorProps, id?:UniqueEntityID) {
    super(props,id);
  }
  public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {

    const guardedProps = [
      { argument: props.description, argumentName: 'description' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Floor>(guardResult.message)
    }
    else {
      const user = new Floor({
        ...props
      }, id);

      return Result.ok<Floor>(user);
    }
  }
}
