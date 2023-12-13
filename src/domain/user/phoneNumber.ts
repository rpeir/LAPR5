import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import phone from "phone";

interface PhoneProps{
  value:string;
}

export class PhoneNumber extends ValueObject<PhoneProps>{

  get value():string{
    return this.props.value;
  }
  constructor(props:PhoneProps) {
    super(props);
  }
  public static create(props:PhoneProps):Result<PhoneNumber>{
    const guardProps=[
      {argument:props.value,argumentName:"value"}
    ];
    const guardResult=Guard.againstNullOrUndefinedBulk(guardProps);
    const valueCheck=phone(props.value, {country: 'PT'});
    if(!valueCheck.isValid){
      return Result.fail<PhoneNumber>("Phone Number is not valid")
  }
    if (!guardResult.succeeded) {
      return Result.fail<PhoneNumber>(guardResult.message)
    } else {
      const user = new PhoneNumber({
        ...props
      })
      return Result.ok<PhoneNumber>(user);
    }
  }
}
