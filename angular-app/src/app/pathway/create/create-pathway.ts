import { Component, OnInit } from "@angular/core";
import { FloorService } from "../../floor/floor.service";
import { Location } from "@angular/common";
import { BuildingService } from "../../building/building.service";
import { Floor } from "../../floor/floor";
import { Building } from "../../building/building";
import { Pathway } from "../pathway";
import { PathwayService } from "../pathway.service";

@Component({
  selector: "app-create",
  templateUrl: "./create-pathway.html",
  styleUrls: ["./create-pathway.css"]
})
export class CreatePathway implements OnInit {

  constructor(private floorService: FloorService, private location: Location, private buildingService: BuildingService, private pathwayService: PathwayService) {
  }

  floorsSource: Floor[] | undefined;
  floorsDestination: Floor[] | undefined;
  buildings: Building[] | undefined;
  pathway = new Pathway();


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

  createPathway() {
    this.pathwayService.createPathway(this.pathway).subscribe({
      next: (data) => {
        window.alert("Pathway created successfully \n"
        + "Building Source: " + data.buildingSource + "\n"
        + "Floor Source: " + data.floorSource + "\n"
        + "Building Destination: " + data.buildingDestination + "\n"
        + "Floor Destination: " + data.floorDestination + "\n");
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
    }

  listFloorsOfBuildingSource(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe(
      {
        next: (data) => {
          this.floorsSource = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      }
    );
  }

  listFloorsOfBuildingDestination(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe({
        next: (data) => {
          this.floorsDestination = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      });
  }

  getFloorInfo(floor: Floor) {
    return floor.description;
  }
}
