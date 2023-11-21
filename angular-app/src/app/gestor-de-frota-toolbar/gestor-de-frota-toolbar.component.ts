import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-gestor-de-frota-toolbar',
  templateUrl: './gestor-de-frota-toolbar.component.html',
  styleUrls: ['./gestor-de-frota-toolbar.component.css']
})
export class GestorDeFrotaToolbarComponent {
  userName = 'Fleet Manager';
  constructor(private router: Router) {
  }
  goToRobots() {
    this.router.navigate(['/robots']);
  }

  goToRobotTypes() {
    this.router.navigate(['/robotTypes']);
  }

  goToLogin() {
    this.router.navigate([""]);
  }

  goToHome() {
    this.router.navigate(["/gestor-de-frota"]);
  }
}
