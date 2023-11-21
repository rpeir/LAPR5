import { TestBed } from '@angular/core/testing';
import { ElevatorUpdateComponent } from './update.component';
import { ElevatorService} from "../elevator.service";
import { BuildingService} from "../../building/building.service";
import {FloorService} from "../../floor/floor.service";
import {HttpClientModule} from "@angular/common/http";
import {Elevator} from "../elevator";
import {of, throwError} from "rxjs";


describe('ElevatorUpdateComponent', () => {
  let component: ElevatorUpdateComponent;
  let elevatorservice: ElevatorService;
  let buildingservice: BuildingService;
  let floorService: FloorService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [ElevatorService,BuildingService,FloorService]
    })
      .compileComponents();
    elevatorservice = TestBed.inject(ElevatorService);
    buildingservice = TestBed.inject(BuildingService);
    floorService = TestBed.inject(FloorService);

    component = new ElevatorUpdateComponent(buildingservice,elevatorservice,floorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle successful elevator update', ()=> {
    const mockElevator: Elevator = {
      id: '1',
      designation: 'Elevator 1',
      buildingDesignation: 'Building A',
      floorsServed: [1, 2, 3],
      brand: 'Brand',
      modelE: 'Model',
      serialNumber: '12345',
      description: 'Elevator description',
    }
    spyOn(elevatorservice, 'updateElevator').and.returnValue(of(mockElevator));
    spyOn(window, 'alert');

    // Act
    component.updateElevator();

    // Assert
    const expectedAlertMessage = new RegExp(
      'Elevator updated successfully\\s*' +
      'Designation: Elevator 1\\s*' +
      'Building Designation: Building A\\s*' +
      'Floors Served: 1,2,3\\s*' +
      'Brand: Brand\\s*' +
      'Model: Model\\s*' +
      'Serial Number: 12345\\s*' +
      'Description: Elevator description\\s*'

    );
    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(actualAlertMessage).toMatch(expectedAlertMessage);
    expect(elevatorservice.updateElevator).toHaveBeenCalledWith(component.elevator);
  });
  it('should handle elevator update error', () => {
    spyOn(elevatorservice, 'updateElevator').and.returnValue(throwError({error:{error:'Error'}}));
    spyOn(window, 'alert');

    // Act
    component.updateElevator();

    // Assert
    const expectedAlertMessage = new RegExp(
      'Error'
    );
    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(actualAlertMessage).toMatch(expectedAlertMessage);
    expect(elevatorservice.updateElevator).toHaveBeenCalledWith(component.elevator);
  })
});
