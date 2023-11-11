import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent {

  constructor(private router: Router) {
  }

  goCreate() {
    this.router.navigate(['floors/create']);
  }

  goToEdit() {
    this.router.navigate(['floors/edit']);
  }

  goToList() {
    this.router.navigate(['floors/list']);
  }

  goToGestorDeCampus() {
    this.router.navigate(['/gestor-de-campus']);
  }
}
