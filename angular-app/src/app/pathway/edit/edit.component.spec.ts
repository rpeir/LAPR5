import { TestBed } from '@angular/core/testing';
import { EditComponent } from "./edit.component";
import { FloorService } from "../../floor/floor.service";
import { PathwayService } from "../pathway.service";
import { BuildingService } from "../../building/building.service";
import { Pathway } from "../pathway";
import { of, throwError } from "rxjs";
import { HttpClientModule } from "@angular/common/http";


describe('PathwayEditComponent', () => {
  let component: EditComponent;
  let floorService : FloorService;
  let buildingService : BuildingService;
  let pathwayService : PathwayService;

  const DEFAULT_PATHWAY: Pathway = {
    domainId: 'b1f1b1f1-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
    buildingSource: 'ac214d2f-b722-4546-a7f1-971023a5ddf8',
    buildingDestination: 'ee1a010a-141f-4e94-ac2c-99138bac5514',
    floorSource: 1,
    floorDestination: 1,
    description: 'Pathway description',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
    })
      .compileComponents();
    floorService = TestBed.inject(FloorService);
    buildingService = TestBed.inject(BuildingService);
    pathwayService = TestBed.inject(PathwayService);
    component = new EditComponent(floorService, buildingService, pathwayService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful pathway update', ()=> {
    const mockPathway: Pathway = {
      ...DEFAULT_PATHWAY
    }
    spyOn(pathwayService, 'editPathway').and.returnValue(of(mockPathway));
    spyOn(window, 'alert');
    component.pathway = mockPathway;

    // Act
    component.editPathway();

    // Assert
    const expectedAlertMessage = new RegExp(
      'Pathway edited successfully\\s*' +
      `Building Source: ${mockPathway.buildingSource}\\s*`+
      `Floor Source: ${mockPathway.floorSource}\\s*`+
      `Building Destination: ${mockPathway.buildingDestination}\\s*`+
      `Floor Destination: ${mockPathway.floorDestination}\\s*`
    );


    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(pathwayService.editPathway).toHaveBeenCalledWith(component.pathway);
    expect(actualAlertMessage).toMatch(expectedAlertMessage)
  });

  it('should handle pathway update error', () => {
    // Arrange
    const errorResponse = {
      error: {
        error: 'Elevator edit failed'
      }
    };
    component.pathway = DEFAULT_PATHWAY;

    spyOn(pathwayService, 'editPathway').and.returnValue(throwError(errorResponse));
    spyOn(window, 'alert');

    // Act
    component.editPathway();

    // Assert
    expect(pathwayService.editPathway).toHaveBeenCalledWith(component.pathway);
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(errorResponse.error.error));
  });

  it('should not update pathway if no fields are selected', () => {
    // Arrange
    spyOn(window, 'alert');
    component.pathway = {
      domainId: DEFAULT_PATHWAY.domainId
    } as Pathway;

    // Act
    component.editPathway();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Please select at least one field to edit');
  });

  it('should not update pathway if no pathway id is provided', () => {
    // Arrange
    spyOn(window, 'alert');
    spyOn(pathwayService, 'editPathway');
    component.pathway = {
      ...DEFAULT_PATHWAY,
      domainId: undefined
    } as Pathway;

    // Act
    component.editPathway();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Pathway ID is required');
    expect(pathwayService.editPathway).not.toHaveBeenCalled();
  });
});
