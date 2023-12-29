import {UserEmail} from "./userEmail";
import {UserPassword} from "./userPassword";
import {PhoneNumber} from "./phoneNumber";
import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";
import { IUserRequestDTO } from "../../dto/IUserRequestDTO";
import {User} from "./user";
import {Role} from "../role/role";
import {RequestState} from "./requestState";



interface UserRequestProps {
    firstName: string;
    lastName: string;
    email: UserEmail|undefined;
    password: UserPassword|undefined
    phoneNumber: PhoneNumber|undefined;
    nif: string;
    state:RequestState;
}

export class UserRequest extends AggregateRoot<UserRequestProps> {

    get id (): UniqueEntityID {
        return this._id;
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
    get nif (): string {
        return this.props.nif;
    }
    set nif (value: string) {
        this.props.nif = value;
    }
    get phoneNumber():PhoneNumber{
        return this.props.phoneNumber;
    }
    set phoneNumber(value:PhoneNumber){
        this.props.phoneNumber=value;
    }
    get state():RequestState{
        return this.props.state;
    }
    public static create(props: UserRequestProps,id?:UniqueEntityID): Result<UserRequest>{

        const guardedProps: any = [
            {argument: props.firstName, argumentName: 'firstName'},
            {argument: props.lastName, argumentName: 'lastName'},
            {argument: props.email, argumentName: 'email'},
            {argument: props.nif, argumentName: 'nif'},
            {argument: props.phoneNumber, argumentName: 'phoneNumber'},
            {argument: props.password, argumentName: 'password'},
            {argument: props.state, argumentName: 'state'}
        ]
        const flag = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!flag.succeeded) {
          return Result.fail<UserRequest>(flag.message);
        }
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result.fail<UserRequest>(guardResult.message)
        } else {
            const req = new UserRequest({
                ...props
            }, id);

            return Result.ok<UserRequest>(req);
        }
    }

  // method that converts a request to a user
  public accept(role:Role): Result<User> {
      const userOrError = User.create({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        nif: this.nif,
        // the role must me 'user' but it already exists in the Role enum
        role: role,
      }, new UniqueEntityID(this.id.toString()));
      // check if the conversion was successful
      if (userOrError.isFailure) {
        // if it wasn't successful, return a failure
        return Result.fail<User>(userOrError.errorValue());
      } else {
        // if it was successful, return the user
        return Result.ok<User>(userOrError.getValue());
      }
    }

  changeState(state: RequestState) {
    this.props.state = state;

  }
  deleteReq(){
     this.props.phoneNumber=undefined
     // this.props.email=undefined;
      this.props.firstName='********+';
      this.props.lastName='**********';
      this.props.nif=undefined;
      this.props.password=undefined;
  }
}
