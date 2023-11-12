import { Component } from '@angular/core';
import { FloorService } from "../../floor/floor.service";
import { Location } from "@angular/common";
import { Building } from "../building";

@Component({
  selector: 'app-list-min-max',
  templateUrl: './list-min-max.component.html',
  styleUrls: ['./list-min-max.component.css']
})
export class ListMinMaxComponent {
  constructor(private createFloorService: FloorService, private location: Location) {
  }

  min: any;
  max: any ;
  buildings: Building[] | any;

  getBuildingFloorMaxMin() {
    this.createFloorService.getBuildingFloorMaxMin(this.max, this.min).subscribe({
      next: (data) => {
        this.buildings = data;
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }
}
