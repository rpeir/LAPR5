import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";
import {BuildingCode} from "../building/BuildingCode";
import {Floor} from "../floor";

interface ElevatorProps{
  code:number;
  designation:string;
  buildingDesignation: string;
  floorsServed: Floor[];
  brand?:string;
  modelE?:string;
  serialNumber?:string;
  description?:string;
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
    get brand():string{
        return this.props.brand;
    }
    get modelE():string{
        return this.props.modelE;
    }
    get serialNumber():string{
        return this.props.serialNumber;
    }
    get description():string{
        return this.props.description;
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
    set brand(v:string){
        this.props.brand=v;
    }
    set modelE(v:string){
        this.props.modelE=v;
    }
    set serialNumber(v:string){
        this.props.serialNumber=v;
    }
    set description(v:string){
        this.props.description=v;
    }
  private constructor(props:ElevatorProps, id?:UniqueEntityID) {
    super(props,id);
  }
  public static create (props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {

    const guardedProps = [
      {argument: props.code, argumentName: 'code'},
      {argument: props.designation, argumentName: 'designation'},
      {argument: props.buildingDesignation, argumentName: 'buildingDesignation'},
      {argument: props.floorsServed, argumentName: 'floorsServed'},
    ];

    const guardBrandModel = (props.brand!="" && props.modelE=="");
    const guardBrand =Guard.inRange(props.brand.length,0,50,"brandLength");
    const guardModel =Guard.inRange(props.modelE.length,0,50,"modelLength");
    const guardSerial =Guard.inRange(props.serialNumber.length,0,50,"serialLength");
    const guardDescription =Guard.inRange(props.description.length,0,250,"descriptionLength");

    const guardProps = Guard.againstNullOrUndefinedBulk(guardedProps);
    const guardResult = Guard.combine([guardProps,guardBrand,guardModel,guardSerial,guardDescription]);

    if (!guardResult.succeeded) {
      return Result.fail<Elevator>(guardResult.message)
    } else if (guardBrandModel) {
      return Result.fail<Elevator>("Model must be filled if brand is filled")
    } else {
      const user = new Elevator({
        ...props
      }, id);

      return Result.ok<Elevator>(user);
    }
  }
}
