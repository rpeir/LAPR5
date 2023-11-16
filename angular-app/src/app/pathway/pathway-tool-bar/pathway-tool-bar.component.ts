import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-pathway-tool-bar',
  templateUrl: './pathway-tool-bar.component.html',
  styleUrls: ['./pathway-tool-bar.component.css']
})
export class PathwayToolBarComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      switch (this.router.url) {
        case '/pathways/list-between-buildings':
          // @ts-ignore
          document.getElementById('list-between-buildings-option').style.fontWeight = 'bold';
          break;
        case '/pathways/edit':
          // @ts-ignore
          document.getElementById('edit-pathway-option').style.fontWeight = 'bold';
          break;
        case '/pathways/create':
          // @ts-ignore
          document.getElementById('create-pathway-option').style.fontWeight = 'bold';
          break;
      }
    });
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

}
