import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";

interface TaskProps{
  code:number;
  description:string;
}
export class Task extends AggregateRoot<TaskProps>{
  get id(): UniqueEntityID {
    return this._id;
  }
  get code(): number {
    return this.props.code;
  }
  get description():string{
    return this.props.description;
  }
  set code(value:number){
    this.props.code=value;
  }
  set description(value:string){
    this.props.description=value;
  }
  private constructor(props:TaskProps, id?:UniqueEntityID) {
    super(props,id);
  }
  public static create (props: TaskProps, id?: UniqueEntityID): Result<Task> {

    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.description, argumentName: 'description' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Task>(guardResult.message)
    }
    else {
      const user = new Task({
        ...props
      }, id);

      return Result.ok<Task>(user);
    }
  }
}
