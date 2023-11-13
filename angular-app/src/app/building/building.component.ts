import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
})
export class BuildingComponent {
  constructor(private router: Router) {}

  goToCreateBuilding() {
    this.router.navigate(['/building/create']).then(r => console.log(r));
  }
  goToEditBuilding() {
    this.router.navigate(['/building/edit']).then(r => console.log(r));
  }
  goToListAllBuildings() {
    this.router.navigate(['/building/list-all']).then(r => console.log(r));
  }
  goToListMinMaxBuildings() {
    this.router.navigate(['/building/list-min-max']).then(r => console.log(r));
  }
  goToLogin() {
    this.router.navigate(['']).then(r => console.log(r));
  }

  goToGestorDeCampus() {
    this.router.navigate(['/gestor-de-campus']);
  }
}
