import { Component, OnInit } from "@angular/core";
import { FloorService } from "../floor.service";
import { BuildingService } from "../../building/building.service";
import { Floor } from "../floor";

@Component({
  selector: 'app-list-of-bulding',
  templateUrl: './floor-list-of-building.component.html',
  styleUrls: ['./floor-list-of-building.component.css']
})
export class FloorListOfBuildingComponent implements OnInit{
  buildingDesignation: any;
  buildings: any;
  floors: Floor[] | undefined;

  constructor(private createFloorService: FloorService, private buildingService: BuildingService) {
  }

  listFloorsOfBuilding(building: string) {
    this.createFloorService.getFloorsOfBuilding(building).subscribe({
      next: (data) => {
        this.floors = data;
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });

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

}
