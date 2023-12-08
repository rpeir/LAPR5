import {Component, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {UserEmail} from "../userEmail";
import {UserPassword} from "../userPassword"
import {UserRequest} from "../UserRequest";

@Component({
    selector: 'app-create',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
    constructor(private userService:UserService) {

    }
    firstName: string | undefined;
    lastName: string | undefined;
    email: UserEmail | undefined;
    password: UserPassword | undefined;
    nif: string | undefined;
    userRequest = new UserRequest();

    ngOnInit(): void {
    }

    createUserRequest() {
      this.userService.createUserRequest(this.userRequest).subscribe({
        next: (data) => {
          window.alert("Request created successfully \n"
            + "First Name: " + data.firstName + "\n"
            + "Last Name: " + data.lastName + "\n"
            + "Email: " + data.email + "\n"
            + "NIF: " + data.nif + "\n"
            + "Phone Number: " + data.phoneNumber + "\n"
          );
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error));
        }
      });
    }
}
