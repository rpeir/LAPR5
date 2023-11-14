import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-floor-tool-bar',
  templateUrl: './floor-tool-bar.component.html',
  styleUrls: ['./floor-tool-bar.component.css']
})
export class FloorToolBarComponent {
  constructor(private router: Router) {
  }

  goCreate() {
    this.router.navigate(['floors/create']);
  }

  goToEdit() {
    this.router.navigate(['floors/edit']);
  }

  goToListFloorOfBuilidng() {
    this.router.navigate(['floors/building']);
  }

  goToGestorDeCampus() {
    this.router.navigate(['/gestor-de-campus']);
  }

  goToLogin() {
    this.router.navigate(['']).then(r => console.log(r));
  }
}
