import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-room-sidenav',
  templateUrl: './room-sidenav.component.html',
  styleUrls: ['./room-sidenav.component.css']
})
export class RoomSidenavComponent{

  constructor(private router : Router) {
    this.router.events.subscribe((event) => {
      if (this.router.url == "/rooms/create") {
        // @ts-ignore
        document.getElementById("create-room-option").style.fontWeight = "bold";
      }
    });
  }
  goToCreateRoom() {
    this.router.navigate(["/rooms/create"]);
  }


}
