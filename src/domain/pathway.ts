import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";

interface PathwayProps{
  description:string;
}
export class Pathway extends AggregateRoot<PathwayProps>{
  get id(): UniqueEntityID {
    return this._id;
  }
  get description():string{
    return this.props.description;
  }
  set description(v:string){
    this.props.description=v;
  }
  private constructor(props:PathwayProps, id?:UniqueEntityID) {
    super(props,id);
  }
  public static create (props: PathwayProps, id?: UniqueEntityID): Result<Pathway> {

    const guardedProps = [
      {argument: props.description, argumentName: 'description'},
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Pathway>(guardResult.message)
    } else {
      const user = new Pathway({
        ...props
      }, id);

      return Result.ok<Pathway>(user);
    }
  }
}
