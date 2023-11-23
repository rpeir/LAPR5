import { TestBed } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { RoomService } from "../../room/room.service";
import { HttpClientModule } from "@angular/common/http";
import { Room } from "../room";
import { of } from "rxjs";
import { BuildingService } from "../../building/building.service";
import { FloorService } from "../../floor/floor.service";
import { Building } from "../../building/building";


describe('CreateComponent', () => {
  let component: CreateComponent;
  let roomService: RoomService;
  let buildingService: BuildingService;
  let floorService: FloorService;

  const DEFAULT_ROOM: Room = {
    name : 'Room A',
    description : 'Room Test',
    category : 'classroom',
    floor : 1,
    building : 'Building A'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [RoomService]
    })
      .compileComponents();
    roomService = TestBed.inject(RoomService);
    buildingService = TestBed.inject(BuildingService);
    floorService = TestBed.inject(FloorService);
    component = new CreateComponent(buildingService, floorService, roomService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful room creation', ()=> {
    const mockRoom: Room = DEFAULT_ROOM;
    component.room = mockRoom;
    spyOn(roomService, 'createRoom').and.returnValue(of(mockRoom));
    spyOn(window, 'alert');

    // Act
    component.createRoom();

    // Assert
    const expectedAlertMessage =
      "Room created successfully \n"
      + "Name: " + mockRoom.name + "\n"
      + "Description: " + mockRoom.description + "\n"
      + "Category: " + mockRoom.category + "\n"
      + "Floor: " + mockRoom.floor + "\n"
      + "Building: " + mockRoom.building + "\n"

    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(roomService.createRoom).toHaveBeenCalledWith(component.room);
    expect(actualAlertMessage).toMatch(expectedAlertMessage);
  });

  it('should not create if not name filled', () => {
    // Arrange
    component.room = {
      description : DEFAULT_ROOM.description,
      category : DEFAULT_ROOM.category,
      floor : DEFAULT_ROOM.floor,
      building : DEFAULT_ROOM.building
    } as Room;

    spyOn(window, 'alert');
    spyOn(roomService, 'createRoom').and.returnValue(of(component.room));

    // Act
    component.createRoom();

    // Assert
    const expectedAlertMessage = 'Room name is required';
    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(actualAlertMessage).toMatch(expectedAlertMessage);
    expect(roomService.createRoom).not.toHaveBeenCalled();

  });

  it('should not create if not description filled', () => {
    // Arrange
    component.room = {
      name : DEFAULT_ROOM.name,
      category : DEFAULT_ROOM.category,
      floor : DEFAULT_ROOM.floor,
      building : DEFAULT_ROOM.building
    } as Room;

    spyOn(window, 'alert');
    spyOn(roomService, 'createRoom').and.returnValue(of(component.room));

    // Act
    component.createRoom();

    // Assert
    const expectedAlertMessage = 'Room description is required';
    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(actualAlertMessage).toMatch(expectedAlertMessage);
    expect(roomService.createRoom).not.toHaveBeenCalled();

  });

  it('should not create if not category filled', () => {
    // Arrange
    component.room = {
      name : DEFAULT_ROOM.name,
      description : DEFAULT_ROOM.description,
      floor : DEFAULT_ROOM.floor,
      building : DEFAULT_ROOM.building
    } as Room;

    spyOn(window, 'alert');
    spyOn(roomService, 'createRoom').and.returnValue(of(component.room));

    // Act
    component.createRoom();

    // Assert
    const expectedAlertMessage = 'Room category is required';
    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(actualAlertMessage).toMatch(expectedAlertMessage);
    expect(roomService.createRoom).not.toHaveBeenCalled();

  });

  it('should not create if not floor filled', () => {
    // Arrange
    component.room = {
      name : DEFAULT_ROOM.name,
      description : DEFAULT_ROOM.description,
      category : DEFAULT_ROOM.category,
      building : DEFAULT_ROOM.building
    } as Room;

    spyOn(window, 'alert');
    spyOn(roomService, 'createRoom').and.returnValue(of(component.room));

    // Act
    component.createRoom();

    // Assert
    const expectedAlertMessage = 'Room floor is required';
    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(actualAlertMessage).toMatch(expectedAlertMessage);
    expect(roomService.createRoom).not.toHaveBeenCalled();

  });

  it('should not create if not building filled', () => {
    // Arrange
    component.room = {
      name : DEFAULT_ROOM.name,
      description : DEFAULT_ROOM.description,
      category : DEFAULT_ROOM.category,
      floor : DEFAULT_ROOM.floor
    } as Room;

    spyOn(window, 'alert');
    spyOn(roomService, 'createRoom').and.returnValue(of(component.room));

    // Act
    component.createRoom();

    // Assert
    const expectedAlertMessage = 'Room building is required';
    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(actualAlertMessage).toMatch(expectedAlertMessage);
    expect(roomService.createRoom).not.toHaveBeenCalled();

  });

});
