import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-gestor-de-campus',
  templateUrl: './gestor-de-campus.component.html',
  styleUrls: ['./gestor-de-campus.component.css']
})
export class GestorDeCampusComponent {

  constructor(private router: Router) {
  }
  goToPathways() {
    this.router.navigate(["/pathways"]);
  }

  goToRooms() {
    this.router.navigate(["/rooms"]);
  }

  goToFloors() {
    this.router.navigate(["/floors"]);
  }

  goToElevators() {
    this.router.navigate(["/elevators"]);
  }

  goToBuildings() {
    this.router.navigate(["/buildings"]);
  }

  goToLogin() {
    this.router.navigate([""]);
  }
}
