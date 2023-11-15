import {Component, OnInit} from '@angular/core';
import {Building} from "../../building/building";
import {Floor} from "../../floor/floor";
import {Elevator} from "../elevator";
import {BuildingService} from "../../building/building.service";
import {ElevatorService} from "../elevator.service";
import {FloorService} from "../../floor/floor.service";

@Component({
  selector: 'app-create',
  templateUrl: './listAll.component.html',
  styleUrls: ['./listAll.component.css']
})
export class ElevatorListAllComponent implements OnInit {

  constructor(private elevatorService: ElevatorService, private buildingService: BuildingService, private floorService: FloorService) {
  }

  buildingDesignation: string | undefined;
  elevators: Elevator[] | undefined;
  buildings: Building[] | undefined;
  floorsServed: Floor[] | undefined;

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

  listElevators() {
    if (this.buildingDesignation != undefined) {
      this.elevatorService.listAllElevators(this.buildingDesignation).subscribe({
        next: (data) => {
          this.elevators = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      });
    }
  }
  getFloorInfo(floor: Floor) {
    return floor.description;
  }
  getBuildingDesignation(building: Building) {
    this.buildingDesignation = building.designation;
    return this.buildingDesignation;
  }
}
