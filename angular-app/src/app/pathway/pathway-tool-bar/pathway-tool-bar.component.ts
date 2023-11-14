import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-pathway-tool-bar',
  templateUrl: './pathway-tool-bar.component.html',
  styleUrls: ['./pathway-tool-bar.component.css']
})
export class PathwayToolBarComponent {
  constructor(private router: Router) {

  }

  goToListBetweenBuildings() {
    this.router.navigate(['/pathways/list-between-buildings']);
  }
  goToEdit() {
    this.router.navigate(['/pathways/edit']);
  }

  goCreate() {
    this.router.navigate(['/pathways/create']);
  }

  goToGestorDeCampus() {
    this.router.navigate(['/gestor-de-campus']);
  }

  goToLogin() {
    this.router.navigate(['']).then(r => console.log(r));
  }
}
