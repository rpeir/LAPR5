import { Component, OnInit } from "@angular/core";
import { TaskRequest } from "../task/taskRequest";
import { Floor } from "../floor/floor";
import { Building } from "../building/building";
import { Room } from "../room/room";
import { RoomService } from "../room/room.service";
import { FloorService } from "../floor/floor.service";
import { BuildingService } from "../building/building.service";
import { TaskType } from "../task/taskType";
import { TaskService } from "../task/task.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-make-task-request",
  templateUrl: "./make-task-request.component.html",
  styleUrls: ["./make-task-request.component.css"]
})
export class MakeTaskRequestComponent implements OnInit {

  taskRequest = new TaskRequest();
  floorsSource: Floor[] | undefined;
  floorsDestination: Floor[] | undefined;
  buildings: Building[] | undefined;
  buildingSource: string | undefined;
  buildingDestination: string | undefined;
  floorSource: string | undefined;
  floorDestination: string | undefined;
  roomSource: string | undefined;
  roomDestination: string | undefined;
  sourceRooms: Room[] | undefined;
  destinationRooms: Room[] | undefined;
  taskTypes = TaskType;


  constructor(private roomService: RoomService,
              private floorService: FloorService,
              private buildingService: BuildingService,
              private taskService: TaskService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.buildingService.getBuildings().subscribe({
        next: (data) => {
          this.buildings = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error));
        }
      }
    );
  }


  createTaskRequest() {
    const user = this.authService.getUser();
    if (user != null) {
      this.taskRequest.userId = user?.id;
    }

    this.taskService.createTaskRequest(this.taskRequest).subscribe({
      next: (data) => {
        window.alert(JSON.stringify(data));
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });

  }


  listFloorsOfBuildingSource(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe(
      {
        next: (data) => {
          this.floorsSource = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      }
    );
  }

  listFloorsOfBuildingDestination(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe({
      next: (data) => {
        this.floorsDestination = data;
      },
      error: (error) => {
        window.alert(error.error.error);
      }
    });
  }

  getFloorInfo(floor: Floor) {
    return floor.description;
  }

  getBuildingInfo(building: Building) {
    return building.description;
  }

  listRoomsOfFloorSource() {
    this.roomService.getRooms(this.buildingSource, this.floorSource).subscribe({
      next: (data) => {
        this.sourceRooms = data;
        if (this.taskRequest.type == TaskType.surveillance) {
          this.destinationRooms = data;
        }
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }

  listRoomsOfFloorDestination() {
    this.roomService.getRooms(this.buildingDestination, this.floorDestination).subscribe({
      next: (data) => {
        this.destinationRooms = data;
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }

  getRoomInfo(room: Room) {
    return "Description: " + room.description + " Category: " + room.category;
  }


  changeToSurveillance() {
    this.destinationRooms = this.sourceRooms;
  }
}
