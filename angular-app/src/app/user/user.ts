import {UserEmail} from "./userEmail";
import {UserPassword} from "./userPassword";
import {Role} from "./role";
import {PhoneNumber} from "./phoneNumber";

export class User{
    firstName!: string;
    lastName!: string;
    email!: UserEmail;
    password!: UserPassword;
    phoneNumber!: PhoneNumber;
    nif?: string;
    role!: Role;
}
