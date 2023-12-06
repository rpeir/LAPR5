import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";
import {Floor} from "../floor/floor";

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
  private constructor(props:ElevatorProps, id?:UniqueEntityID) {
    super(props,id);
  }
  public static create (props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
    const guardResult = this.validate(props);

    if (guardResult.isFailure) {
      return Result.fail<Elevator>(guardResult.error)
    } else {
      const elevator = new Elevator({
        ...props
      }, id);

      return Result.ok<Elevator>(elevator);
    }
  }

  public update(props: ElevatorProps) : Result<Elevator> {
    let combinedProps : ElevatorProps = {...this.props };

    for (let prop in props) {
      if (props[prop] != null || props[prop] != undefined) {
        combinedProps[prop] = props[prop];
      }
    }

    const guardResult = Elevator.validate(combinedProps);
    if (guardResult.isFailure) {
      return Result.fail<Elevator>(guardResult.error);
    } else {
      this.props.code = combinedProps.code;
      this.props.designation = combinedProps.designation;
      this.props.description = combinedProps.description;
      this.props.brand = combinedProps.brand;
      this.props.modelE = combinedProps.modelE;
      this.props.serialNumber = combinedProps.serialNumber;
      this.props.floorsServed = combinedProps.floorsServed;
      this.props.buildingDesignation = combinedProps.buildingDesignation;
      return Result.ok<Elevator>(this);
    }
  }

  private static validate(props: ElevatorProps): Result<void> {
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
      return Result.fail(guardResult.message)
    } else if (guardBrandModel) {
      return Result.fail("Model must be filled if brand is filled")
    } else {
      return Result.ok()
    }
  }
}
