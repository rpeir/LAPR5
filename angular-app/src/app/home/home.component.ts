import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Role} from "../user/role";
import {MatDialog} from "@angular/material/dialog";
import {ConsentComponent} from "../auth/consent/consent.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userRole? : Role | string
  userRoleString : string = "no-login";

  constructor(private authService : AuthService, private dialog : MatDialog) {
  }

  ngOnInit() {
    this.userRole = this.authService.getUser()?.role;
    if (this.userRole instanceof Role) {
      this.userRoleString = this.userRole.name;
    } else if (this.userRole) {
      this.userRoleString = this.userRole;
    }
    this.displayConsent();
  }

  displayConsent() {
    const consent = localStorage.getItem("consent") == "true"
    if (!consent) {
      let dialogConsent = this.dialog.open(ConsentComponent, {
      });

      dialogConsent.afterClosed().subscribe({
        next: (accepted : boolean) => {
          if (accepted) {
            localStorage.setItem("consent", "true");
          }
        }
      })
    }
  }

}
