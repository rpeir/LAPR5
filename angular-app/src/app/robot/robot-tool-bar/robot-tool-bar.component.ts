import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-robot-tool-bar',
  templateUrl: './robot-tool-bar.component.html',
  styleUrls: ['./robot-tool-bar.component.css']
})
export class RobotToolBarComponent {

  constructor(private router: Router) {
  }
  goToGestorDeFrota() {
    this.router.navigate(['/gestor-de-frota']);
  }

  goToDisable() {
    this.router.navigate(['robots/disable']);
  }

  goToList() {
    this.router.navigate(['robots/list']);
  }

  goCreate() {
    this.router.navigate(['robots/create']);
  }
}
