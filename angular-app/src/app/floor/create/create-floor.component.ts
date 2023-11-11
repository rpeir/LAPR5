import { Component, OnInit } from "@angular/core";
import { Floor } from "../floor";
import { BuildingService } from "../../building/building.service";
import { CreateFloorService } from "./create-floor.service";
import { Location } from "@angular/common";
import { Building } from "../../building/building";

@Component({
  selector: 'app-create',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent implements OnInit{

  constructor(private createFloorService: CreateFloorService, private location: Location, private buildingService: BuildingService) {
  }

  floor = new Floor();
  buildings: Building[] | undefined;
  createFloor() {
    this.createFloorService.createFloor(this.floor).subscribe(data => {
      window.alert("Floor created successfully \n"
                  + "Floor number: " + data.floorNr + "\n"
                  + "Building: " + data.building + "\n"
                  + "Description: " + data.description + "\n");

      this.location.back();
    }, error => {
      window.alert("Error! Floor not created" + "\n" + error.error.body)
      this.location.back();
    });
  }

  ngOnInit() {
    this.buildingService.getBuildings().subscribe(data => {
      this.buildings = data;
    });
  }

}
