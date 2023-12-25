import {UserEmail} from "./userEmail";
import {UserPassword} from "./userPassword";
import {Role} from "./role";
import {PhoneNumber} from "./phoneNumber";

export class User{
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password?: string;
    phoneNumber!: PhoneNumber;
    nif?: string;
    role!: Role;
}
