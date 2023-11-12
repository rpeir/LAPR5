import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.css']
})
export class PathwayComponent {
  constructor(private router: Router) {

  }


  goToListBetweenBuildings() {

  }

  goToEdit() {

  }

  goCreate() {
    this.router.navigate(['/pathways/create']);
  }

  goToGestorDeCampus() {
    this.router.navigate(['/gestor-de-campus']);
  }
}
