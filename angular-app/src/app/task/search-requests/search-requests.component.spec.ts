import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import { SearchRequestsComponent } from './search-requests.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import {RoomService} from "../../room/room.service";
import {FloorService} from "../../floor/floor.service";
import {UserService} from "../../user/user.service";
import {TaskService} from "../task.service";
import {RobotTypeService} from "../../robot-type/robot-type.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MainToolbarComponent} from "../../main-toolbar/main-toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {RouterTestingModule} from "@angular/router/testing";
import {TaskRequest} from "../taskRequest";
import {Room} from "../../room/room";
import {User} from "../../user/user";
import {Floor} from "../../floor/floor";
import {of} from "rxjs";
import {RobotType} from "../../robot-type/robot-type";

describe('SearchRequestsComponent', () => {
  let component: SearchRequestsComponent;
  let fixture: ComponentFixture<SearchRequestsComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRoomService: jasmine.SpyObj<RoomService>;
  let mockFloorService: jasmine.SpyObj<FloorService>;
  let mockRobotTypeService: jasmine.SpyObj<RobotTypeService>;

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

  const DEFAULT_ROBOT_TYPES : RobotType[] = [{
    id : '1234',
    name : 'Robot Type',
    taskTypes : ['Delivery'],
    robotTypeModel : 'Robot Model',
    brand : 'Robot Brand'
  }];

  beforeEach(() => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getAllTaskRequests', 'getTaskRequestByParams']);
    mockUserService = jasmine.createSpyObj('UserService', ['getUtentes', 'getUserById']);
    mockRoomService = jasmine.createSpyObj('RoomService', ['getRoomById']);
    mockFloorService = jasmine.createSpyObj('FloorService', ['getFloorById']);
    mockRobotTypeService = jasmine.createSpyObj('RobotTypeService', ['getRobotTypes']);

    TestBed.configureTestingModule({
      declarations: [
        SearchRequestsComponent,
        MainToolbarComponent
      ],
      imports: [
        FormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        MatSortModule,
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatOptionModule,
        HttpClientTestingModule,
        MatToolbarModule,
        MatMenuModule,
        RouterTestingModule
      ],
      providers: [
        UserService,
        RoomService,
        FloorService,
        TaskService,
        RobotTypeService,
      ]
    })

    fixture = TestBed.createComponent(SearchRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner initially', () => {
    const loadingElement = fixture.debugElement.query(By.css('#loading'));
    expect(loadingElement).toBeTruthy();
  });

  it('should load data and display search form and table when start', () => {
    // Arrange
    mockTaskService.getAllTaskRequests.and.returnValue(of(DEFAULT_REQUESTS));
    mockRobotTypeService.getRobotTypes.and.returnValue(of(DEFAULT_ROBOT_TYPES));
    mockFloorService.getFloorById.and.returnValue(of(DEFAULT_FLOOR));
    mockUserService.getUserById.and.returnValue(of(DEFAULT_USER));
    mockRoomService.getRoomById.and.returnValues(of(PICKUP_ROOM), of(DELIVERY_ROOM));

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      // Assert
      expect(component.requests).toEqual(DEFAULT_REQUESTS);
      expect(component.requests[0].user).toEqual(DEFAULT_USER);
      expect(component.requests[0].pickupRoom).toEqual(PICKUP_ROOM);
      expect(component.requests[0].deliveryRoom).toEqual(DELIVERY_ROOM);
      expect(component.requests[0].floor).toEqual(DEFAULT_FLOOR);
    });

  });

  it('should load data and display search form and table when search', (() => {
    // Arrange
    mockTaskService.getTaskRequestByParams.and.returnValue(of(DEFAULT_REQUESTS));
    mockRobotTypeService.getRobotTypes.and.returnValue(of(DEFAULT_ROBOT_TYPES));
    mockFloorService.getFloorById.and.returnValue(of(DEFAULT_FLOOR));
    mockUserService.getUserById.and.returnValue(of(DEFAULT_USER));
    mockRoomService.getRoomById.and.returnValues(of(PICKUP_ROOM), of(DELIVERY_ROOM));

    // Act
    component.ngOnInit();
    component.search();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      // Assert
      expect(component.requests).toEqual(DEFAULT_REQUESTS);
      expect(component.requests[0].user).toEqual(DEFAULT_USER);
      expect(component.requests[0].pickupRoom).toEqual(PICKUP_ROOM);
      expect(component.requests[0].deliveryRoom).toEqual(DELIVERY_ROOM);
      expect(component.requests[0].floor).toEqual(DEFAULT_FLOOR);
    });

  }));

});
