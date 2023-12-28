import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Role} from "../user/role";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userRole? : Role | string
  userRoleString : string = "no-login";

  constructor(private authService : AuthService) {
  }

  ngOnInit() {
    this.userRole = this.authService.getUser()?.role;
    if (this.userRole instanceof Role) {
      this.userRoleString = this.userRole.name;
    } else if (this.userRole) {
      this.userRoleString = this.userRole;
    }
  }

}
