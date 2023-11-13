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
    this.router.navigate(['/gestor-de-campus']);
  }

  goToGestorDeFrota() {
    this.router.navigate(['/gestor-de-frota']);
  }

  goToUtente() {
    this.router.navigate(['/utente']);
  }

  goToAdministratorDeSistema() {
    this.router.navigate(['/administrador-de-sistema']);
  }

  goToGestorDeTarefas() {
    this.router.navigate(['/gestor-de-tarefas']);
  }
}
