import { Component, OnInit } from "@angular/core";
import { FloorService } from "../floor.service";
import { BuildingService } from "../../building/building.service";
import { Floor } from "../floor";

@Component({
  selector: 'app-list-of-bulding-with-pathway',
  templateUrl: './list-of-bulding-with-pathway.component.html',
  styleUrls: ['./list-of-bulding-with-pathway.component.css']
})
export class ListOfBuldingWithPathwayComponent implements OnInit {
  buildingDesignation: any;
  buildings: any;
  connections: Map<number, Floor[]> | undefined;

  constructor(private createFloorService: FloorService, private buildingService: BuildingService) {
  }

  listFloorsOfBuildingWithPathways(building: string) {
    this.createFloorService.getFloorsOfBuildingWithPathways(building).subscribe({
      next: (data) => {
        this.connections = data;
      },
      error: (error) => {
        this.connections = undefined;
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
