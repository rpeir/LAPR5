import {UserEmail} from "./userEmail";
import {UserPassword} from "./userPassword";
import {Role} from "./role";

export class User{
    firstName!: string;
    lastName!: string;
    email!: UserEmail;
    password!: UserPassword;
    nif?: string;
    role!: Role;
}
