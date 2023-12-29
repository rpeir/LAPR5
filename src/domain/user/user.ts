import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../role/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../../core/logic/Guard";
import {PhoneNumber} from "./phoneNumber";
interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  phoneNumber: PhoneNumber;
  nif?: string;
  role: Role;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get role (): Role {
    return this.props.role;
  }
  get nif (): string {
    return this.props.nif;
  }
  set nif (value: string) {
    this.props.nif = value;
  }

  set role (value: Role) {
    this.props.role = value;
  }

  get phoneNumber():PhoneNumber{
    return this.props.phoneNumber;
  }
  set phoneNumber(value:PhoneNumber){
    this.props.phoneNumber=value;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = this.validate(props);
    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.error)
    } else {
      const user = new User({
        ...props
      }, id);

      return Result.ok<User>(user);
    }
  }

  public static validate(props : UserProps) : Result<void> {
    const guardedProps = [
      {argument: props.firstName, argumentName: 'firstName'},
      {argument: props.lastName, argumentName: 'lastName'},
      {argument: props.email, argumentName: 'email'},
      {argument: props.role, argumentName: 'role'},
      {argument: props.phoneNumber, argumentName: 'phoneNumber'},
      {argument: props.password, argumentName: 'password'},
    ];
    const flag = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!flag.succeeded) {
      return Result.fail(flag.message);
    }
    if (props.role.name === "user") {
      guardedProps.push({argument: props.nif, argumentName: 'nif'});
    }
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail(guardResult.message)
    } else {
      return Result.ok();
    }
  }

  public update(props : any) : Result<User> {
    let combinedProps : UserProps = {...this.props };

    for (let prop in props) {
      if (props[prop] != null || props[prop] != undefined) {
        combinedProps[prop] = props[prop];
      }
    }

    const guardResult = User.validate(combinedProps);

    if (guardResult.isFailure) {
      return Result.fail(guardResult.error);
    } else {
      this.props.firstName = combinedProps.firstName;
      this.props.lastName = combinedProps.lastName;
      this.props.email = combinedProps.email;
      this.props.role = combinedProps.role;
      this.props.phoneNumber = combinedProps.phoneNumber;
      this.props.password = combinedProps.password;
      this.props.nif = combinedProps.nif;
      return Result.ok(this);
    }
  }
}
