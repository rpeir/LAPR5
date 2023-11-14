import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  constructor(private router: Router) {}

  goToCreateRoom() {
    this.router.navigate(['/rooms/create']).then(r=>console.log(r));
  }
  goToGestorDeCampus() {
    this.router.navigate(['/gestor-de-campus']);
  }
  goToLogin() {
    this.router.navigate(['']).then(r => console.log(r));
  }
}
