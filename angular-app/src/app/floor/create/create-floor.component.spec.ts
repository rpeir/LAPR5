import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFloorComponent } from './create-floor.component';
import { FloorService } from "../floor.service";
import { BuildingService } from "../../building/building.service";
import { HttpClientModule } from "@angular/common/http";
import { of, throwError } from "rxjs";

describe('CreateFloorComponent', () => {
  let component: CreateFloorComponent;
  let floorService: FloorService;
  let buildingService: BuildingService;
  let fixture: ComponentFixture<CreateFloorComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ FloorService, BuildingService ],
      declarations: [CreateFloorComponent]
    })
      .compileComponents();
    floorService = TestBed.inject(FloorService);
    buildingService = TestBed.inject(BuildingService);
    component = new CreateFloorComponent(floorService, buildingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should handle successful floor creation ", () => {
    const mockFloor = {
      floorNr: 1,
      building: "Building A",
      description: "Floor description"
    };
    spyOn(floorService, "createFloor").and.returnValue(of(mockFloor));
    spyOn(window, "alert");

    // Act
    component.createFloor();

    // Assert
    const expectedAlertMessage = new RegExp(
      "Floor created successfully\\s*" +
      "Floor number: 1\\s*" +
      "Building: Building A\\s*" +
      "Description: Floor description\\s*"
    );

    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(floorService.createFloor).toHaveBeenCalledWith(component.floor);
    expect(actualAlertMessage).toMatch(expectedAlertMessage);
  });

  it("should handle unsuccessful floor creation", () => {
    const mockError = {
      error: {
        error: "Error message"
      }
    };
    spyOn(floorService, "createFloor").and.returnValue(throwError(mockError));
    spyOn(window, "alert");

    // Act
    component.createFloor();

    // Assert
    expect(floorService.createFloor).toHaveBeenCalledWith(component.floor);
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(mockError.error.error));
  });
});
