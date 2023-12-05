import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-administrador-de-sistema-toolbar',
  templateUrl: './administrador-de-sistema-toolbar.component.html',
  styleUrls: ['./administrador-de-sistema-toolbar.component.css']
})
export class AdministradorDeSistemaToolbarComponent {
  userName = 'System Administrator';
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate([""]);
  }

  goToHome() {
    this.router.navigate(["/system-administrator"]);
  }

  goToCreateUserOption() {
    this.router.navigate(["/system-administrator/create-user"]);
  }

  goToCreateManagerOption() {
    this.router.navigate(["/system-administrator/create-manager"]);
  }
  goToRegisterUserOption() {
    this.router.navigate(["/system-administrator/register-user"]);
  }
}
