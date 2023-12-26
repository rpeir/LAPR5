import {UserEmail} from "./userEmail";
import {UserPassword} from "./userPassword";
import {PhoneNumber} from "./phoneNumber";
import {Role} from "./role";

export class UserRequest{
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  phoneNumber!: string;
  nif!: string;
}
