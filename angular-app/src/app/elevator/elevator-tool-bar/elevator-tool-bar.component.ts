import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-elevator-tool-bar',
  templateUrl: './elevator-tool-bar.component.html',
  styleUrls: ['./elevator-tool-bar.component.css']
})
export class ElevatorToolBarComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      switch (this.router.url) {
        case "/elevator/create" :
          // @ts-ignore
          document.getElementById("create-elevator-option").style.fontWeight = "bold";
          break;
        case "/elevator/update" :
          // @ts-ignore
          document.getElementById("update-elevator-option").style.fontWeight = "bold";
          break;
        case "/elevator/replace" :
          // @ts-ignore
          document.getElementById("replace-elevator-option").style.fontWeight = "bold";
          break;
        case "/elevator/list-all-elevators" :
          // @ts-ignore
          document.getElementById("list-all-elevators-option").style.fontWeight = "bold";
          break;
      }
    });
  }
  goToCreateElevator() {
    this.router.navigate(['/elevator/create']).then(r => console.log(r));
  }
  goToUpdateElevator() {
    this.router.navigate(['/elevator/update']).then(r => console.log(r));
  }
  goToReplaceElevator() {
    this.router.navigate(['/elevator/replace']).then(r => console.log(r));
  }
  goToListAllElevators() {
    this.router.navigate(['/elevator/list-all-elevators']).then(r => console.log(r));
  }

}
