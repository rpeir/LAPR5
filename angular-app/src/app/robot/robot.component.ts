import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent {

  constructor(private router: Router) {
  }
  goToGestorDeFrota() {
    this.router.navigate(['/gestor-de-frota']);
  }

  goToList() {

  }

  goToEdit() {

  }

  goCreate() {
    this.router.navigate(['robots/create']);
  }
}
