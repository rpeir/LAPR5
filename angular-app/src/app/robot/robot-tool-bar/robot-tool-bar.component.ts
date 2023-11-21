import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-robot-tool-bar',
  templateUrl: './robot-tool-bar.component.html',
  styleUrls: ['./robot-tool-bar.component.css']
})
export class RobotToolBarComponent {

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      switch (this.router.url) {
        case "/robots/create" :
          // @ts-ignore
          document.getElementById("create-robot-option").style.fontWeight = "bold";
          break;
        case "/robots/disable" :
          // @ts-ignore
          document.getElementById("disable-robot-option").style.fontWeight = "bold";
          break;
        case "/robots/list" :
          // @ts-ignore
          document.getElementById("list-all-robots-option").style.fontWeight = "bold";
          break;
      }
    });
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
