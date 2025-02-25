import {Component, OnInit} from '@angular/core';
import {BuildingService} from "../../building/building.service";
import {ElevatorService} from "../elevator.service";
import {FloorService} from "../../floor/floor.service";
import {Building} from "../../building/building";
import {Floor} from "../../floor/floor";
import {Elevator} from "../elevator";

@Component({
  selector: 'app-create',
  templateUrl: './replace.component.html',
  styleUrls: ['./replace.component.css']
})
export class ElevatorReplaceComponent implements OnInit{
  constructor(private buildingService:BuildingService,private elevatorService:ElevatorService,private floorService:FloorService) {
  }
  buildings: Building[] | undefined;
  designation: string | undefined;
  buildingDesignation: string | undefined;
  floorsServed: Floor[] | undefined;
  brand: string | undefined;
  modelE: string | undefined;
  serialNumber: string | undefined;
  description: string | undefined;
  elevator = new Elevator();


  ngOnInit() {
    this.buildingService.getBuildings().subscribe({
      next: (data) => {
        this.buildings = data;
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });

  }
  replaceElevator() {
    this.elevatorService.replaceElevator(this.elevator).subscribe({
      next: (data) => {
        window.alert("Elevator replaced successfully \n"
          + "Designation: " + data.designation + "\n"
          + "Building Designation: " + data.buildingDesignation + "\n"
          + "Floors Served: " + data.floorsServed + "\n"
          + "Brand: " + data.brand + "\n"
          + "Model: " + data.modelE + "\n"
          + "Serial Number: " + data.serialNumber + "\n"
          + "Description: " + data.description + "\n");
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }
  listFloorsOfBuildingDesignation(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe({
      next: (data) => {
        this.floorsServed = data;
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
