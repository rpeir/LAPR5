import {Component, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {UserEmail} from "../userEmail";
import {UserPassword} from "../userPassword"
import {UserRequest} from "../UserRequest";
import {PhoneNumber} from "../phoneNumber";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-create',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
    constructor(private userService:UserService, private authService: AuthService, private router: Router) {

    }
    firstName: string | undefined;
    lastName: string | undefined;
    email: UserEmail | undefined;
    password: UserPassword | undefined;
    nif: string | undefined;
    phoneNumber:  PhoneNumber| undefined;
    userRequest = new UserRequest();

    ngOnInit(): void {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(["/"]);
      }
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
