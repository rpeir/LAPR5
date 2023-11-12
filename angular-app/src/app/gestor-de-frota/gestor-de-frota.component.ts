import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestor-de-frota',
  templateUrl: './gestor-de-frota.component.html',
  styleUrls: ['./gestor-de-frota.component.css']
})
export class GestorDeFrotaComponent {
  constructor(private router: Router) {
  }
  goToRobots() {
    this.router.navigate(['/robots']);
  }

  goToRobotTypes() {
    this.router.navigate(['/robotTypes']);
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
