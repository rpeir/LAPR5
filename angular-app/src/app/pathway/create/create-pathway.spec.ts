import { TestBed } from '@angular/core/testing';
import { CreatePathway } from './create-pathway';
import { BuildingService} from "../../building/building.service";
import {FloorService} from "../../floor/floor.service";
import {HttpClientModule} from "@angular/common/http";
import {Pathway} from "../pathway";
import {of, throwError} from "rxjs";
import {PathwayService} from "../pathway.service";


describe('CreatePathway', () => {
  let component: CreatePathway;
  let buildingservice: BuildingService;
  let floorService: FloorService;
  let pathwayService: PathwayService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [BuildingService,FloorService, PathwayService]
    })
      .compileComponents();
    buildingservice = TestBed.inject(BuildingService);
    floorService = TestBed.inject(FloorService);
    pathwayService = TestBed.inject(PathwayService);

    component = new CreatePathway(floorService, buildingservice, pathwayService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle successful pathway creation', ()=> {
    const mockPathway: Pathway = {
      buildingSource: 'ac214d2f-b722-4546-a7f1-971023a5ddf8',
      buildingDestination: 'ee1a010a-141f-4e94-ac2c-99138bac5514',
      floorSource: 1,
      floorDestination: 1,
      description: 'Pathway description',
    }
    spyOn(pathwayService, 'createPathway').and.returnValue(of(mockPathway));
    spyOn(window, 'alert');

    // Act
    component.createPathway();

    // Assert
    const expectedAlertMessage = new RegExp(
      'Pathway created successfully\\s*' +
      'Building Source: ac214d2f-b722-4546-a7f1-971023a5ddf8\\s*' +
      'Floor Source: 1\\s*' +
      'Building Destination: ee1a010a-141f-4e94-ac2c-99138bac5514\\s*' +
      'Floor Destination: 1\\s*'
    );


    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(pathwayService.createPathway).toHaveBeenCalledWith(component.pathway);
    expect(actualAlertMessage).toMatch(expectedAlertMessage)
  });
  it('should handle pathway creation error', () => {
    // Arrange
    const errorResponse = {
      error: {
        error: 'Elevator creation failed'
      }
    };

    spyOn(pathwayService, 'createPathway').and.returnValue(throwError(errorResponse));
    spyOn(window, 'alert');

    // Act
    component.createPathway();

    // Assert
    expect(pathwayService.createPathway).toHaveBeenCalledWith(component.pathway);
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(errorResponse.error.error));
  });
});
