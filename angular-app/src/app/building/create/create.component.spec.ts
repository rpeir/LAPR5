import { TestBed } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { BuildingService} from "../../building/building.service";
import {HttpClientModule} from "@angular/common/http";
import {Building} from "../building";
import {of, throwError} from "rxjs";


describe('CreateComponent', () => {
  let component: CreateComponent;
  let buildingservice: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [BuildingService]
    })
      .compileComponents();
    buildingservice = TestBed.inject(BuildingService);
    component = new CreateComponent(buildingservice);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle successful elevator creation', ()=> {
    const mockBuilding: Building = {
      domainId:"1",
      code: '1',
      designation:"A",
      description:"Building A",
      length: 10,
      width: 10,
      height: 10,
    }
    spyOn(buildingservice, 'createBuilding').and.returnValue(of(mockBuilding));
    spyOn(window, 'alert');

    // Act
    component.createBuilding();

    // Assert
    const expectedAlertMessage =
      'Building created successfully\n' +
      'Code:1\n' +
      'Designation:A\n' +
      'Description:Building A\n' +
      'Length:10\n' +
      'Width:10\n' +
      'Height:10\n';


    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(buildingservice.createBuilding).toHaveBeenCalledWith(component.building);
    expect(actualAlertMessage).toMatch(expectedAlertMessage);
  });
  it('should handle elevator creation error', () => {
    // Arrange
    const errorResponse = {
      error: {
        error: 'Elevator creation failed'
      }
    };

    spyOn(buildingservice, 'createBuilding').and.returnValue(throwError(errorResponse));
    spyOn(window, 'alert');

    // Act
    component.createBuilding();

    // Assert
    expect(buildingservice.createBuilding).toHaveBeenCalledWith(component.building);
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(errorResponse.error.error));
  });
});
