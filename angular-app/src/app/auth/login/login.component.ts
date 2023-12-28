import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Role } from "../../user/role";
import { User } from "../../user/user";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }

  firstName: string | undefined;
  lastName: string | undefined;
  email = "";
  password = "";
  nif?: string | undefined;
  role: Role | undefined;
  user = new User();


  login() {
    this.authService.login(this.email, this.password)
      .subscribe({
          next: () => {
            this.router.navigate(["/"]);
          },
          error: (error) => {
            console.log(error.error);
          }
        }
      );
  }

}
