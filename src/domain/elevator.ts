import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";

interface ElevatorProps{
  designation:string;
}
export class Elevator extends AggregateRoot<ElevatorProps>{
  get id():UniqueEntityID{
    return this._id;
  }
  get designation():string{
    return this.props.designation;
  }
  set designation(v:string){
     this.props.designation=v;
  }
  private constructor(props:ElevatorProps, id?:UniqueEntityID) {
    super(props,id);
  }
  public static create (props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {

    const guardedProps = [
      {argument: props.designation, argumentName: 'designation'},
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Elevator>(guardResult.message)
    } else {
      const user = new Elevator({
        ...props
      }, id);

      return Result.ok<Elevator>(user);
    }
  }
}
