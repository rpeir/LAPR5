import {UserEmail} from "./userEmail";
import {UserPassword} from "./userPassword";
import {PhoneNumber} from "./phoneNumber";
import {Role} from "./role";

export class UserRequest{
  firstName!: string;
  lastName!: string;
  email!: UserEmail;
  password!: UserPassword;
  phoneNumber!: PhoneNumber;
  nif!: string;
}
