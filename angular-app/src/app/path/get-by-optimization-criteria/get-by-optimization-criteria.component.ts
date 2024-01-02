import { Component, OnInit } from '@angular/core';
import { FloorService } from '../../floor/floor.service';
import { Location } from '@angular/common';
import { BuildingService } from '../../building/building.service';
import { PathwayService } from '../../pathway/pathway.service';
import { Floor } from '../../floor/floor';
import { Building } from '../../building/building';
import { Path } from '../path';
import { PathService } from '../path.service';
import { RoomService } from '../../room/room.service';
import { Room } from '../../room/room';

@Component({
  selector: 'app-get-by-optimization-criteria',
  templateUrl: './get-by-optimization-criteria.component.html',
  styleUrls: ['./get-by-optimization-criteria.component.css'],
})
export class GetByOptimizationCriteriaComponent implements OnInit {
  constructor(
    private roomService: RoomService,
    private pathService: PathService,
    private floorService: FloorService,
    private location: Location,
    private buildingService: BuildingService,
    private pathwayService: PathwayService,
  ) {}

  floorsSource: Floor[] | undefined;
  floorsDestination: Floor[] | undefined;
  buildings: Building[] | undefined;
  buildingSource: string | undefined;
  buildingDestination: string | undefined;
  floorSource: string | undefined;
  floorDestination: string | undefined;
  optimizationCriteria = ['Less Buildings', 'Less Elevator'];
  path: Path | undefined;
  selectedOptimizationCriteria: any;
  roomToRoom = false;
  roomSource: string | undefined;
  roomDestination: string | undefined;
  sourceRooms: Room[] | undefined;
  destinationRooms: Room[] | undefined;
  waiting: boolean = false;

  getPathBetweenFloors() {
    this.waiting = true;
    if (this.selectedOptimizationCriteria == 'Less Buildings') {
      if (this.roomToRoom) {
        this.pathService
          .getPathRoomToRoomLessBuildings(
            this.buildingSource,
            this.floorSource,
            this.buildingDestination,
            this.floorDestination,
            this.roomSource,
            this.roomDestination,
          )
          .subscribe({
            next: data => {
              this.path = data;
              this.waiting = false;
              localStorage.setItem('pathFile', JSON.stringify(this.path));
            },
            error: error => {
              localStorage.removeItem('pathFile');
              window.alert(JSON.stringify(error.error.error));
              this.waiting = false;
            },
          });
      } else {
        this.pathService
          .getPathBetweenFloorsLessBuildings(
            this.buildingSource,
            this.floorSource,
            this.buildingDestination,
            this.floorDestination,
          )
          .subscribe({
            next: data => {
              this.path = data;
              this.waiting = false;
              localStorage.setItem('pathFile', JSON.stringify(this.path));
            },
            error: error => {
              localStorage.removeItem('pathFile');
              window.alert(JSON.stringify(error.error.error));
              this.waiting = false;
            },
          });
      }
    } else {
      if (this.roomToRoom) {
        this.pathService
          .getPathRoomToRoomLessElevators(
            this.buildingSource,
            this.floorSource,
            this.buildingDestination,
            this.floorDestination,
            this.roomSource,
            this.roomDestination,
          )
          .subscribe({
            next: data => {
              this.path = data;
              this.waiting = false;
              localStorage.setItem('pathFile', JSON.stringify(this.path));
            },
            error: error => {
              localStorage.removeItem('pathFile');
              window.alert(JSON.stringify(error.error.error));
              this.waiting = false;
            },
          });
      } else {
        this.pathService
          .getPathBetweenFloorsLessElevators(
            this.buildingSource,
            this.floorSource,
            this.buildingDestination,
            this.floorDestination,
          )
          .subscribe({
            next: data => {
              this.path = data;
              this.waiting = false;
              localStorage.setItem('pathFile', JSON.stringify(this.path));
            },
            error: error => {
              localStorage.removeItem('pathFile');
              window.alert(JSON.stringify(error.error.error));
              this.waiting = false;
            },
          });
      }
    }
  }

  ngOnInit() {
    localStorage.removeItem('pathFile');
    this.buildingService.getBuildings().subscribe({
      next: data => {
        this.buildings = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }

  listFloorsOfBuildingSource(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe({
      next: data => {
        this.floorsSource = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }

  listFloorsOfBuildingDestination(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe({
      next: data => {
        this.floorsDestination = data;
      },
      error: error => {
        window.alert(error.error.error);
      },
    });
  }

  getFloorInfo(floor: Floor) {
    return floor.description;
  }

  getBuildingInfo(building: Building) {
    return building.description;
  }

  toggleRoomsOption() {
    this.roomToRoom = !this.roomToRoom;
  }

  listRoomsOfFloorSource() {
    this.roomService.getRooms(this.buildingSource, this.floorSource).subscribe({
      next: data => {
        this.sourceRooms = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }

  listRoomsOfFloorDestination() {
    this.roomService.getRooms(this.buildingDestination, this.floorDestination).subscribe({
      next: data => {
        this.destinationRooms = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }

  getRoomInfo(room: Room) {
    return 'Description: ' + room.description + ' Category: ' + room.category;
  }

  redirectToMapViewer() {
    window.location.href = '/map-viewer';
  }

  protected readonly localStorage = localStorage;
}
