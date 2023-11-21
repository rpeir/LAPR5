import { TestBed } from '@angular/core/testing';
import { ElevatorListAllComponent } from './listAll.component';
import { ElevatorService} from "../elevator.service";
import { BuildingService} from "../../building/building.service";
import {FloorService} from "../../floor/floor.service";
import {HttpClientModule} from "@angular/common/http";
import {Elevator} from "../elevator";
import {of} from "rxjs";


describe('CreateComponent', () => {
  let component: ElevatorListAllComponent;
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

    component = new ElevatorListAllComponent(elevatorservice,buildingservice,floorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle successful elevator listing', ()=> {
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
    spyOn(elevatorservice, 'listAllElevators').and.returnValue(of([mockElevator]));

    // Act

    component.buildingDesignation = 'Building A';
    component.listElevators();

    // Assert
     expect(component.elevators).toEqual([mockElevator]);
  });
});
