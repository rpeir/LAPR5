import { TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { BuildingService } from '../building.service';
import {HttpClientModule} from "@angular/common/http";
import {Building} from "../building";
import {FormBuilder} from "@angular/forms";
import {of, throwError} from "rxjs";

describe('EditComponent', () => {
  let component: EditComponent;
  let buildingservice: BuildingService;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [BuildingService]
    })
      .compileComponents();
    buildingservice = TestBed.inject(BuildingService);
    fb=TestBed.inject(FormBuilder);
    component = new EditComponent(buildingservice,fb);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle successful building update', () => {
    const mockBuilding: Building = {
      domainId:'1',
      code:'1',
      designation:'A',
      description:'Building A edited',
      length:100,
      width:100,
      height:100
    };

    spyOn(buildingservice, 'editBuilding').and.returnValue(of(mockBuilding));
    spyOn(window, 'alert');

    component.updateBuilding();


    const expectedAlertMessage =
      'Building updated successfully \n' +
      'Code: 1\n' +
      'Designation: A\n' +
      'Description: Building A edited\n' +
      'Length: 100\n' +
      'Width: 100\n' +
      'Height: 100\n';


    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0].replace(/\r\n/g, '\n');;
    expect(actualAlertMessage).toEqual(expectedAlertMessage);
  });
  it('should handle building update error', () => {
    const mockError = { error: { error: 'Update failed' } };

    // Set up form values to simulate the form data
    component.editForm.setValue({
      code: '1',
      designation: 'A',
      description: 'Building A edited',
      length: 100,
      width: 100,
      height: 100,
    });

    spyOn(buildingservice, 'editBuilding').and.returnValue(throwError(mockError));
    spyOn(window, 'alert');

    component.updateBuilding();

    expect(buildingservice.editBuilding).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(mockError.error.error));
  });
});
