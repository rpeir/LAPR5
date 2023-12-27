import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { PendingRequestsComponent } from './pending-requests.component';
import { TaskService } from '../task.service';
import { UserService } from '../../user/user.service';
import { RoomService } from '../../room/room.service';
import { FloorService } from '../../floor/floor.service';
import { TaskRequest } from '../taskRequest';
import { SelectRobotComponent } from './select-robot/select-robot.component';
import { Room } from "../../room/room";
import { User } from "../../user/user";
import { Floor } from "../../floor/floor";
import { Robot } from "../../robot/robot";
import { MainToolbarComponent } from "../../main-toolbar/main-toolbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";

describe('PendingRequestsComponent', () => {
  let component: PendingRequestsComponent;
  let fixture: ComponentFixture<PendingRequestsComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRoomService: jasmine.SpyObj<RoomService>;
  let mockFloorService: jasmine.SpyObj<FloorService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  const DEFAULT_REQUESTS: TaskRequest[] = [
    {
      id: '1234',
      type: 'Delivery',
      userId: '1234',
      pickupRoomId: '1234',
      deliveryRoomId: '1234',
      description: 'Test task request',
      requestStatus: 'Pending',
      floorId: '1234',
    },
  ];

  const PICKUP_ROOM : Room = {
    id : '1234',
    name : 'Pickup Room',
    description : 'Room description',
    category : 'Classroom',
    floor : 1,
    building : 'A'
  };
  const DELIVERY_ROOM : Room = {
    id : '1234',
    name : 'Delivery Room',
    description : 'Room description',
    category : 'Classroom',
    floor : 1,
    building : 'A'
  };

  const DEFAULT_USER: User = {
    id : '1234',
    firstName : 'Joao',
    lastName : 'Silva',
    email : 'joaosilva@email.org',
    phoneNumber : {
      value :'912345678'
    },
    nif : '213456789',
    role : {
      id : '1234',
      name : 'User'
    }
  };

  const DEFAULT_FLOOR : Floor = {
    domainId : '1234',
    building : 'A',
    description : 'Floor description',
    floorNr : 1
  };

  const DEFAULT_ROBOT : Robot = {
    id : '1234',
    robotCode : 'robot-1234',
    nickName : 'nickName',
    robotType : 'robotType',
    serialNr : '1234',
    description : 'Robot description'
  }


  beforeEach(() => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getPendingTaskRequests', 'acceptTaskRequest', 'rejectTaskRequest']);
    mockUserService = jasmine.createSpyObj('UserService', ['getUserById']);
    mockRoomService = jasmine.createSpyObj('RoomService', ['getRoomById']);
    mockFloorService = jasmine.createSpyObj('FloorService', ['getFloorById']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);

    TestBed.configureTestingModule({
      declarations: [PendingRequestsComponent, MainToolbarComponent],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: UserService, useValue: mockUserService },
        { provide: RoomService, useValue: mockRoomService },
        { provide: FloorService, useValue: mockFloorService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MainToolbarComponent, useValue: {} }
      ],
      imports: [MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule]
    });

    fixture = TestBed.createComponent(PendingRequestsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pending task requests on ngOnInit', () => {
    const mockRequests: TaskRequest[] = DEFAULT_REQUESTS;
    mockTaskService.getPendingTaskRequests.and.returnValue(of(mockRequests));

    fixture.detectChanges();

    expect(mockTaskService.getPendingTaskRequests).toHaveBeenCalled();
    expect(component.requests).toEqual(mockRequests);
  });

  it('should fetch common request data for each request', () => {
    const mockRequest: TaskRequest = DEFAULT_REQUESTS[0];

    mockUserService.getUserById.and.returnValue(of(DEFAULT_USER));
    mockRoomService.getRoomById.and.returnValues(of(PICKUP_ROOM), of(DELIVERY_ROOM));

    component.getCommonRequestData(mockRequest);

    expect(mockUserService.getUserById).toHaveBeenCalledWith(DEFAULT_USER.id);
    expect(mockRoomService.getRoomById).toHaveBeenCalledWith(PICKUP_ROOM.id);
    expect(mockRoomService.getRoomById).toHaveBeenCalledWith(DELIVERY_ROOM.id);

    // Check if the request data is updated accordingly
    expect(mockRequest.user).toEqual(DEFAULT_USER);
    expect(mockRequest.pickupRoom).toEqual(PICKUP_ROOM);
    expect(mockRequest.deliveryRoom).toEqual(DELIVERY_ROOM);
  });

  it('should fetch surveillance request data for each request', () => {
    const mockRequest: TaskRequest = DEFAULT_REQUESTS[0];

    mockFloorService.getFloorById.and.returnValue(of(DEFAULT_FLOOR));

    component.getSurveillanceRequestData(mockRequest);

    expect(mockFloorService.getFloorById).toHaveBeenCalledWith(DEFAULT_FLOOR.domainId ?? '');

    // Check if the request data is updated accordingly
    expect(mockRequest.floor).toEqual(DEFAULT_FLOOR);
  });


});
