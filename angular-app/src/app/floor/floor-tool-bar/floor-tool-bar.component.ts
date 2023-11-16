import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-floor-tool-bar',
  templateUrl: './floor-tool-bar.component.html',
  styleUrls: ['./floor-tool-bar.component.css']
})
export class FloorToolBarComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      switch (this.router.url) {
        case '/floors/create':
          // @ts-ignore
          document.getElementById('create-floor-option').style.fontWeight = 'bold';
          break;
        case '/floors/edit':
          // @ts-ignore
          document.getElementById('edit-floor-option').style.fontWeight = 'bold';
          break;
        case '/floors/building':
          // @ts-ignore
          document.getElementById('list-floors-building-option').style.fontWeight = 'bold';
          break;
      }
    });
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

}
