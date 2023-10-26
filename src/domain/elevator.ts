import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";
import {BuildingCode} from "./BuildingCode";
import {Floor} from "./floor";

interface ElevatorProps{
  code:number;
  designation:string;
  buildingDesignation: string;
  floorsServed: Floor[];
}
export class Elevator extends AggregateRoot<ElevatorProps>{
  get id():UniqueEntityID{
    return this._id;
  }
  get code():number{
    return this.props.code;
  }
  get designation():string{
    return this.props.designation;
  }
  get buildingDesignation():string{
    return this.props.buildingDesignation;
  }
  get floorsServed():Floor[]{
    return this.props.floorsServed;
  }
  set code(v:number){
     this.props.code=v;
  }
  set designation(v:string){
     this.props.designation=v;
  }
  set buildingDesignation(v:string){
     this.props.buildingDesignation=v;
  }
  set floorsServed(v:Floor[]){
     this.props.floorsServed=v;
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
