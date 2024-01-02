import {Component, OnInit} from '@angular/core';
import {TaskRequest} from "../taskRequest";
import {User} from "../../user/user";
import {UserService} from "../../user/user.service";
import {RobotTypeService} from "../../robot-type/robot-type.service";
import {TaskService} from "../task.service";
import {RobotType} from "../../robot-type/robot-type";
import {FloorService} from "../../floor/floor.service";
import {RoomService} from "../../room/room.service";
import {Sort} from "@angular/material/sort";

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
        this.getAllRequestsData();
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

  sort(sort: Sort) {
    const data = this.requests.slice();
    if (!sort.active || sort.direction === '') {
      this.requests = data;
      return;
    }

    this.requests = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'description':
          return this.compare(a.description, b.description, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        case 'user':
          return this.compare(a.user?.firstName ?? 0, b.user?.firstName ?? 0, isAsc);
        case 'pickupRoom':
          return this.compare(a.pickupRoom?.name ?? 0, b.pickupRoom?.name ?? 0, isAsc);
        case 'deliveryRoom':
          return this.compare(a.deliveryRoom?.name ?? 0, b.deliveryRoom?.name ?? 0, isAsc);
        case 'requestStatus':
          return this.compare(a.requestStatus, b.requestStatus, isAsc);
        case 'identificationCode':
          return this.compare(a.identificationCode ?? 0, b.identificationCode ?? 0, isAsc);
        case 'senderName':
          return this.compare(a.senderName ?? 0, b.senderName ?? 0, isAsc);
        case 'receiverName':
          return this.compare(a.receiverName ?? 0, b.receiverName ?? 0, isAsc);
        case 'senderContact':
          return this.compare(a.senderContact ?? 0, b.senderContact ?? 0, isAsc);
        case 'receiverContact':
          return this.compare(a.receiverContact ?? 0, b.receiverContact ?? 0, isAsc);
        case 'confirmationCode':
          return this.compare(a.confirmationCode ?? 0, b.confirmationCode ?? 0, isAsc);
        case 'emergencyNumber':
          return this.compare(a.emergencyNumber ?? 0, b.emergencyNumber ?? 0, isAsc);
        case 'floorNr':
          return this.compare(a.floor?.floorNr ?? 0, b.floor?.floorNr ?? 0, isAsc);
        case 'createdAt':
          return this.compareDate(a.createdAt ?? Date.now(), b.createdAt ?? Date.now(), isAsc);
        default:
          return 0;
      }
    });
  }

  private compareDate(a: number | Date, b: number | Date, isAsc: boolean) {
    if (a instanceof Date && b instanceof Date)
      return (a.getTime() < b.getTime() ? -1 : 1) * (isAsc ? 1 : -1);
    else
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
