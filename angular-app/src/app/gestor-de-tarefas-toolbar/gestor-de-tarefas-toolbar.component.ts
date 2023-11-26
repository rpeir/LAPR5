import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-gestor-de-tarefas-toolbar',
  templateUrl: './gestor-de-tarefas-toolbar.component.html',
  styleUrls: ['./gestor-de-tarefas-toolbar.component.css']
})
export class GestorDeTarefasToolbarComponent {
  userName = 'Task Manager';
  constructor(private router: Router) {}

  goToOptimizationCriteria() {
    this.router.navigate(["/path/optimization-criteria"]);
  }

  goToLogin() {
    this.router.navigate([""]);
  }

  goToHome() {
    this.router.navigate(["/gestor-de-tarefas"]);
  }
}
