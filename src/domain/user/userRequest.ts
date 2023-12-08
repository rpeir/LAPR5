import {UserEmail} from "./userEmail";
import {UserPassword} from "./userPassword";
import {PhoneNumber} from "./phoneNumber";
import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";


interface UserRequestProps {
    firstName: string;
    lastName: string;
    email: UserEmail;
    password: UserPassword;
    phoneNumber: PhoneNumber;
    nif: string;
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
    public static create(props: UserRequestProps,id?:UniqueEntityID): Result<UserRequest>{

        const guardedProps: any = [
            {argument: props.firstName, argumentName: 'firstName'},
            {argument: props.lastName, argumentName: 'lastName'},
            {argument: props.email, argumentName: 'email'},
            {argument: props.nif, argumentName: 'nif'},
            {argument: props.phoneNumber, argumentName: 'phoneNumber'},
            {argument: props.password, argumentName: 'password'},
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
}
