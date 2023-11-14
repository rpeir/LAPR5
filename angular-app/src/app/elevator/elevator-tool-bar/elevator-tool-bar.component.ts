import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-elevator-tool-bar',
  templateUrl: './elevator-tool-bar.component.html',
  styleUrls: ['./elevator-tool-bar.component.css']
})
export class ElevatorToolBarComponent {
  constructor(private router: Router) {}
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
    this.router.navigate(['/elevator/list-all']).then(r => console.log(r));
  }
  goToLogin() {
    this.router.navigate(['']).then(r => console.log(r));
  }

  goToGestorDeCampus() {
    this.router.navigate(['/gestor-de-campus']);
  }

}
