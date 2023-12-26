import { Component, OnInit } from "@angular/core";
import { TaskRequest } from "../taskRequest";
import { TaskService } from "../task.service";
import { UserService } from "../../user/user.service";
import { RoomService } from "../../room/room.service";
import { MatDialog } from "@angular/material/dialog";
import { SelectRobotComponent } from "./select-robot/select-robot.component";
import { FloorService } from "../../floor/floor.service";

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.css']
})
export class PendingTasksComponent implements OnInit {

  constructor(private taskService : TaskService, private userService : UserService, private roomService : RoomService,
              public dialog : MatDialog, private floorService : FloorService) {
  }

  requests : TaskRequest[] = [];

  ngOnInit(): void {
    this.taskService.getPendingTaskRequests().subscribe({
      complete: () => {
        this.getAllRequestsData();
      },
      next: (data) => {
        this.requests = data;
      },
      error: (err) => {
        window.alert(err.error);
      }
    });
  }

  getAllRequestsData() {
    this.requests.map((request) => {
      this.getRequestData(request);
    });
  }

  getRequestData(request : TaskRequest) {
    switch (request.type) {
      case "Delivery":
        this.getCommonRequestData(request);
        break;
      case "Surveillance": {
        this.getCommonRequestData(request);
        this.getSurveillanceRequestData(request);
      }
    }

  }


  getCommonRequestData(request : TaskRequest) {
    this.userService.getUserById(request.userId).subscribe({
      next: (data) => {
        request.user = data;
      },
      error: (err) => {
        window.alert(err.error);
      }
    });
    this.roomService.getRoomById(request.pickupRoomId).subscribe({
      next: (data) => {
        request.pickupRoom = data;
      },
      error: (err) => {
        window.alert(err.error);
      }
    });
    this.roomService.getRoomById(request.deliveryRoomId).subscribe({
      next: (data) => {
        request.deliveryRoom = data;
      },
      error: (err) => {
        window.alert(err.error);
      }
    });
  }

  acceptRequest(request: TaskRequest) {
    let dialogRef = this.dialog.open(SelectRobotComponent, {
      height: '400px',
      width: '400px',
      data: {taskType: request.type}
    });

    dialogRef.afterClosed().subscribe(robot => {
      if (robot) {
        this.taskService.acceptTaskRequest(request.id, robot.id).subscribe({
          next: (data) => {
            window.alert("Request accepted");
          },
          complete: () => {
            window.location.reload();
          },
          error: (err) => {
            window.alert(err.error);
          }
        });
      }
    });
  }

  rejectRequest(request: TaskRequest) {
    this.taskService.rejectTaskRequest(request.id).subscribe({
      next: (data) => {
        window.alert("Request rejected");
      },
      complete: () => {
        window.location.reload();
      },
      error: (err) => {
        window.alert(err.error);
      }
    });
  }

  getSurveillanceRequestData(request: TaskRequest) {
    if (request.floorId)
    this.floorService.getFloorById(request.floorId).subscribe({
      next: (data) => {
        request.floor = data;
      },
      error: (err) => {
        window.alert(err.error);
      }
    });
  }
}
