import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-gestor-de-campus-toolbar',
  templateUrl: './gestor-de-campus-toolbar.component.html',
  styleUrls: ['./gestor-de-campus-toolbar.component.css']
})
export class GestorDeCampusToolbarComponent {
  userName = 'Campus Manager';
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

  goBack() {
    this.router.navigate(["/"]);
  }

  goToHome() {
    this.router.navigate(["/gestor-de-campus"]);
  }
}
