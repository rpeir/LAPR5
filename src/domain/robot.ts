import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";

interface RobotProps{
  brand:string;
  model:string;
  serialNumber:number;
  state: string;
  code: number;
  nickname:string;
}
export class Robot extends AggregateRoot<RobotProps>{
  get id(): UniqueEntityID {
    return this._id;
  }
  get brand():string{
    return this.props.brand;
  }
  get model():string{
    return this.props.model;
  }
  get serialNumber():number{
    return this.props.serialNumber;
  }
  get state():string{
    return this.props.state;
  }
  get code():number{
    return this.props.code;
  }
  get nickname():string{
    return this.props.nickname;
  }
  set brand(value:string){
    this.props.brand=value;
  }
  set model(value:string){
    this.props.model=value;
  }
  set serialNumber(value:number){
    this.props.serialNumber=value;
  }
  set state(value:string){
    this.props.state=value;
  }
  set code(value:number){
    this.props.code=value;
  }
  set nickname(value:string){
    this.props.nickname=value;
  }
  private constructor(props:RobotProps, id?:UniqueEntityID) {
    super(props,id);
  }
  public static create (props: RobotProps, id?: UniqueEntityID): Result<Robot> {

    const guardedProps = [

      { argument: props.brand, argumentName: 'brand' },
      { argument: props.model, argumentName: 'model' },
      { argument: props.serialNumber, argumentName: 'serial number' },
      { argument: props.state, argumentName: 'state' },
      { argument: props.code, argumentName: 'code' },
      { argument: props.nickname, argumentName: 'nickname' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Robot>(guardResult.message)
    }
    else {
      const user = new Robot({
        ...props
      }, id);

      return Result.ok<Robot>(user);
    }
  }

}
