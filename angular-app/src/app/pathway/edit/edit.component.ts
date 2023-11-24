import { Component, OnInit } from "@angular/core";
import { FloorService } from "../../floor/floor.service";
import { BuildingService } from "../../building/building.service";
import { PathwayService } from "../pathway.service";
import { Floor } from "../../floor/floor";
import { Building } from "../../building/building";
import { Pathway } from "../pathway";
import { floor } from "lodash";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private floorService: FloorService, private buildingService: BuildingService, private pathwayService: PathwayService) {
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

  editPathway() {
    if (this.pathway.domainId == undefined) {window.alert("Pathway ID is required"); return;}

    if (this.pathway.buildingSource == undefined && this.pathway.floorSource == undefined &&
      this.pathway.buildingDestination == undefined && this.pathway.floorDestination == undefined
      && this.pathway.description == undefined) {
      window.alert("Please select at least one field to edit");
      return;
    }

    this.pathwayService.editPathway((this.pathway)).subscribe({
      next: (data) => {
        window.alert("Pathway edited successfully \n"
          + "Building Source: " + data.buildingSource + "\n"
          + "Floor Source: " + data.floorSource + "\n"
          + "Building Destination: " + data.buildingDestination + "\n"
          + "Floor Destination: " + data.floorDestination + "\n"
          + "Description: " + data.description);
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }

  listFloorsOfBuildingSource(building: any) {
    if (building == undefined) { return }
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
    if (building == undefined) { return }
    this.floorService.getFloorsOfBuilding(building).subscribe({
      next: (data) => {
        this.floorsDestination = data;
      },
      error: (error) => {
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


}
