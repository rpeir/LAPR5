import { Component, OnInit } from "@angular/core";
import { Pathway } from "../pathway";
import { Building } from "../../building/building";
import { FloorService } from "../../floor/floor.service";
import { Location } from "@angular/common";
import { BuildingService } from "../../building/building.service";
import { PathwayService } from "../pathway.service";

@Component({
  selector: 'app-list-between-buildings',
  templateUrl: './list-between-buildings.component.html',
  styleUrls: ['./list-between-buildings.component.css']
})
export class ListBetweenBuildingsComponent implements OnInit {

  buildings: Building[] = [];
  pathways: Pathway[] | undefined;
  buildingSource : Building | undefined;
  buildingDestination : Building | undefined;
  waiting = false;

  constructor(private buildingService: BuildingService, private pathwayService: PathwayService) {
  }

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

  listPathways() {
    if (this.buildingSource == undefined || this.buildingDestination == undefined) {
      window.alert("Please select both buildings");
      this.pathways = undefined;
      return;
    }
    this.waiting = true;
    this.pathways = undefined;

    const buildingSourceID = this.buildingSource.domainId;
    const buildingDestinationID = this.buildingDestination.domainId;
    this.pathwayService.listPathwaysBetweenBuildings(buildingSourceID, buildingDestinationID).subscribe({
      next: (data) => {
        this.pathways = data;
        this.waiting = false;
      },
      error: (error) => {
        this.pathways = undefined
        this.waiting = false;
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }

  getBuildingInfo(building: Building) {
    return building.description;
  }
}
