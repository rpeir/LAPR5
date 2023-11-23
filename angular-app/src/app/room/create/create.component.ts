import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Room, RoomCategory } from "../room";
import { BuildingService } from "../../building/building.service";
import { Building } from "../../building/building";
import { FloorService } from "../../floor/floor.service";
import { Floor } from "../../floor/floor";
import { RoomService } from "../room.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private buildingService : BuildingService, private floorService : FloorService, private roomService : RoomService) {}

  buildings : Building[] | undefined;
  room : Room = new Room();
  categories = Object.values(RoomCategory);
  floors : Floor[] = [];

  ngOnInit() {
    this.buildingService.getBuildings().subscribe({
        next: (data) => {
          this.buildings = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      }
    );
  }

  listFloorsOfBuilding(building: Building) {
    console.log(building);
    this.floorService.getFloorsOfBuilding(building.designation).subscribe({
      next: (data) => {
        this.floors = data;
      },
      error: (error) => {
        this.floors = [];
        window.alert(error.error.error);
      }
    });
  }

  getFloorInfo(floor: Floor) {
    return floor.description;
  }

  getBuildingInfo(building: Building) {
    return building.description;
  }

  createRoom() {
    if (this.room.name == undefined || this.room.name == "") {
      window.alert("Room name is required");
      return;
    }

    if (this.room.description == undefined || this.room.description == "") {
      window.alert("Room description is required");
      return;
    }

    if (this.room.category == undefined || this.room.category == "") {
      window.alert("Room category is required");
      return;
    }

    if (this.room.floor == undefined) {
      window.alert("Room floor is required");
      return;
    }

    if (this.room.building == undefined) {
      window.alert("Room building is required");
      return;
    }

    this.roomService.createRoom(this.room).subscribe({
      next: (data) => {
        window.alert("Room created successfully \n"
        + "Name: " + data.name + "\n"
        + "Description: " + data.description + "\n"
        + "Category: " + data.category + "\n"
        + "Floor: " + data.floor + "\n"
        + "Building: " + data.building + "\n");
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });

  }

}
