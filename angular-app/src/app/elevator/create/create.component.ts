import {Component, OnInit} from '@angular/core';
import {ElevatorService} from "../elevator.service";
import {FloorService} from "../../floor/floor.service";
import {BuildingService} from "../../building/building.service";
import {Floor} from "../../floor/floor";
import {Elevator} from "../elevator";
import {Building} from "../../building/building";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ElevatorCreateComponent implements OnInit {
  constructor(private elevatorService: ElevatorService, private floorService: FloorService, private buildingService: BuildingService) {
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

  createElevator() {
    this.elevatorService.createElevator(this.elevator).subscribe({
      next: (data) => {
        window.alert("Elevator created successfully \n"
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

  getBuildingDesignation(building: Building) {
    this.buildingDesignation = building.designation;
    return this.buildingDesignation;
  }
  getFloorInfo(floor: Floor) {
    return floor.description;
  }


  getFloorsServed(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe(
        {
          next: (data) => {
            this.floorsServed = data;
          },
          error: (error) => {
            window.alert(JSON.stringify(error.error.error));
          }
        }
    );
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
}
