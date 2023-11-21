import { Component, OnInit } from "@angular/core";
import { Building } from "../../building/building";
import { FloorService } from "../floor.service";
import { Location } from "@angular/common";
import { BuildingService } from "../../building/building.service";
import { Floor } from "../floor";

@Component({
  selector: 'app-edit',
  templateUrl: './edit-floor.component.html',
  styleUrls: ['./edit-floor.component.css']
})
export class EditFloorComponent implements OnInit {
  constructor(private floorService: FloorService, private buildingService: BuildingService) {
  }

  building: string | undefined;
  buildings: Building[] | undefined;
  floors: Floor[] | undefined;
  newFloor = new Floor();

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
  getBuildingInfo(building: Building) {
    return building.description;
  }


  listFloorsOfBuilding(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe(
      {
        next: (data) => {
          this.floors = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      }
    );
  }

  getFloorInfo(floor: Floor) {
    return floor.description;
  }

  editFloor() {
    console.log(this.newFloor);
    this.floorService.editFloor(this.newFloor).subscribe({
      next: (data) => {
        window.alert("Floor edited successfully \n"
          + "Floor number: " + data.floorNr + "\n"
          + "Building: " + data.building + "\n"
          + "Description: " + data.description + "\n");
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }
}
