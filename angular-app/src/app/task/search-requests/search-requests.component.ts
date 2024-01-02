import {Component, OnInit} from '@angular/core';
import {TaskRequest} from "../taskRequest";
import {User} from "../../user/user";
import {UserService} from "../../user/user.service";
import {RobotTypeService} from "../../robot-type/robot-type.service";
import {TaskService} from "../task.service";
import {RobotType} from "../../robot-type/robot-type";
import {FloorService} from "../../floor/floor.service";
import {RoomService} from "../../room/room.service";

@Component({
  selector: 'app-search-requests',
  templateUrl: './search-requests.component.html',
  styleUrls: ['./search-requests.component.css']
})
export class SearchRequestsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private robotTypeService: RobotTypeService,
    private taskService: TaskService,
    private roomService: RoomService,
    private floorService: FloorService,
  ) {}

  columnsToDisplay = [
    'description',
    'type',
    'user',
    'pickupRoom',
    'deliveryRoom',
    'requestStatus',
    'identificationCode',
    'senderName',
    'receiverName',
    'senderContact',
    'receiverContact',
    'confirmationCode',
    'emergencyNumber',
    'floorNr',
    'createdAt'];
  statuses = ['pending', 'approved', 'rejected'];
  robotTypes : RobotType[] = [];
  users : User[] = [];

  user? : User;
  type? : RobotType;
  status? : string;
  startDate? : Date;
  endDate? : Date;

  requests : TaskRequest[] = [];

  loading = true;
  async ngOnInit() {
    // wait for get all users, robot types, all tasks, and then set loading to false
    let utentesLoaded = false;
    let robotTypesLoaded = false;
    let tasksLoaded = false;
    this.userService.getUtentes().subscribe({
      next: (data) => {
        this.users = data;
        this.getAllRequestsData();
        utentesLoaded = true;
      },
      error: (error) => {
        window.alert(error.error);
      }
    });
    this.robotTypeService.getRobotTypes().subscribe({
      next: (data) => {
        this.robotTypes = data;
        robotTypesLoaded = true;
      },
      error: (error) => {
        window.alert(error.error);
      }
    });
    this.taskService.getAllTaskRequests().subscribe({
      next: (data) => {
        this.requests = data;
        tasksLoaded = true;
      },
      error: (error) => {
        window.alert(error.error);
      }
    });
    // wait for all to be loaded
    while (!utentesLoaded || !robotTypesLoaded || !tasksLoaded) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.loading = false;
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

  getSurveillanceRequestData(request: TaskRequest) {
    if (request.floorId)
      this.floorService.getFloorById(request.floorId).subscribe({
        next: (data) => {
          request.floor = data;
        },
        error: (err) => {
          window.alert(err.message);
        }
      });
  }

  search() {
    this.loading = true;
    this.taskService.getTaskRequestByParams(this.user?.id, this.status, this.type?.id, this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.requests = data;
        this.getAllRequestsData();
        this.loading = false;
      },
      error: (error) => {
        window.alert(error.message);
        this.loading = false;
      }
    });
  }
}
