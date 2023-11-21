import { TestBed } from '@angular/core/testing';
import { ElevatorReplaceComponent } from './replace.component';
import { ElevatorService} from "../elevator.service";
import { BuildingService} from "../../building/building.service";
import {FloorService} from "../../floor/floor.service";
import {HttpClientModule} from "@angular/common/http";
import {Elevator} from "../elevator";
import {of, throwError} from "rxjs";


describe('CreateComponent', () => {
  let component: ElevatorReplaceComponent;
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

    component = new ElevatorReplaceComponent(buildingservice,elevatorservice,floorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle successful elevator replacement', ()=> {
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
    spyOn(elevatorservice, 'replaceElevator').and.returnValue(of(mockElevator));
    spyOn(window, 'alert');

    // Act
    component.replaceElevator();

    // Assert
    const expectedAlertMessage = new RegExp(
      'Elevator replaced successfully\\s*' +
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
    expect(elevatorservice.replaceElevator).toHaveBeenCalledWith(component.elevator);
  });
  it('should handle elevator replacement error', () => {
    spyOn(elevatorservice, 'replaceElevator').and.returnValue(throwError({error:{error:'Error'}}));
    spyOn(window, 'alert');

    // Act
    component.replaceElevator();

    // Assert
    const expectedAlertMessage = new RegExp(
      'Error'
    );
    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(actualAlertMessage).toMatch(expectedAlertMessage);
    expect(elevatorservice.replaceElevator).toHaveBeenCalledWith(component.elevator);
  })
});
