import { Component, OnInit } from "@angular/core";
import { Floor } from "../floor";
import { BuildingService } from "../../building/building.service";
import { FloorService } from "../floor.service";
import { Location } from "@angular/common";
import { Building } from "../../building/building";

@Component({
  selector: "app-create",
  templateUrl: "./create-floor.component.html",
  styleUrls: ["./create-floor.component.css"]
})
export class CreateFloorComponent implements OnInit {

  constructor(private createFloorService: FloorService, private location: Location, private buildingService: BuildingService) {
  }

  floor = new Floor();
  buildings: Building[] | undefined;

  createFloor() {
    this.createFloorService.createFloor(this.floor).subscribe({
      next: (data) => {
        window.alert("Floor created successfully \n"
          + "Floor number: " + data.floorNr + "\n"
          + "Building: " + data.building + "\n"
          + "Description: " + data.description + "\n");

        this.location.back();
      },
      error: (error) => {
        window.alert(error.error.error);
      }
    });
  }

  ngOnInit() {
    this.buildingService.getBuildings().subscribe({
        next: (data) => {
          this.buildings = data;
        },
        error: (error) => {
          window.alert(error.error.error);
        }
      }
    );
  }

  getBuildingInfo(building: Building) {
    return building.description;
  }
}
