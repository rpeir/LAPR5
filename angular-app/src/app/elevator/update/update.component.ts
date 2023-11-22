import { Component, OnInit } from '@angular/core';
import { Building } from '../../building/building';
import { Floor } from '../../floor/floor';
import { Elevator } from '../elevator';
import { BuildingService } from '../../building/building.service';
import { ElevatorService } from '../elevator.service';
import { FloorService } from '../../floor/floor.service';

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
  getFloorInfo(floor: Floor) {
    return floor.description;
  }
  updateElevator() {
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
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }
}
