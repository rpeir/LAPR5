import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  goToGestorDeCampus() {
    this.router.navigate(['/campus-manager']);
  }

  goToGestorDeFrota() {
    this.router.navigate(['/fleet-manager']);
  }

  goToUtente() {
    this.router.navigate(['/user']);
  }

  goToAdministratorDeSistema() {
    this.router.navigate(['/system-administrator']);
  }

  goToGestorDeTarefas() {
    this.router.navigate(['/task-manager']);
  }

  goToMapViewer() {
    this.router.navigate(['/map-viewer']);
  }
}
