import { Component, OnInit } from '@angular/core';
import { Building } from '../../building/building';
import { Floor } from '../../floor/floor';
import { Elevator } from '../elevator';
import { BuildingService } from '../../building/building.service';
import { ElevatorService } from '../elevator.service';
import { FloorService } from '../../floor/floor.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class ElevatorUpdateComponent implements OnInit {
  constructor(
    private buildingService: BuildingService,
    private elevatorService: ElevatorService,
    private floorService: FloorService,
  ) {}

  buildings: Building[] | undefined;
  building: Building | undefined;
  elevators: Elevator[] | undefined;
  floorsServed: Floor[] | undefined;
  elevator : Elevator | undefined;

  ngOnInit() {
    this.buildingService.getBuildings().subscribe({
      next: data => {
        this.buildings = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }
  listFloorsOfBuildingDesignation(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe({
      next: data => {
        this.floorsServed = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }

  listFloorsOfChangedBuilding(building:any) {
    if (this.elevator != undefined) {
      this.elevator.floorsServed = [];
      this.listFloorsOfBuildingDesignation(building);
    }
  }

  listFloorsOfBuilding() {
    this.listFloorsOfBuildingDesignation(this.building?.designation);
  }

  getFloorInfo(floor: Floor) {
    return floor.description;
  }
  updateElevator() {
    if (this.elevator == undefined) {
      window.alert('Please select an elevator');
      return;
    }
    this.elevator.code = undefined;
    this.elevatorService.updateElevator(this.elevator).subscribe({
      next: data => {
        window.alert(
          'Elevator updated successfully \n' +
            'Designation: ' +
            data.designation +
            '\n' +
            'Building Designation: ' +
            data.buildingDesignation +
            '\n' +
            'Floors Served: ' +
            data.floorsServed +
            '\n' +
            'Brand: ' +
            data.brand +
            '\n' +
            'Model: ' +
            data.modelE +
            '\n' +
            'Serial Number: ' +
            data.serialNumber +
            '\n' +
            'Description: ' +
            data.description +
            '\n',
        );
        window.location.reload();
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }

  getBuildingElevators(b: Building) {
    this.elevators = [];
    this.elevator = undefined;
    this.elevatorService.listAllElevators(b.designation).subscribe({
      next: data => {
        this.elevators = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }

}
