import {TestBed } from '@angular/core/testing';
import { ListAllComponent } from './list-all.component';
import {BuildingService} from "../building.service";
import {HttpClientModule} from "@angular/common/http";
import {ElevatorService} from "../../elevator/elevator.service";
import {Building} from "../building";
import {of} from "rxjs";


describe('ListAllComponent', () => {
  let component: ListAllComponent;
  let buildingservice: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [BuildingService]
    })
      .compileComponents();
    buildingservice = TestBed.inject(BuildingService);

    component = new ListAllComponent(buildingservice);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle successful building listing', ()=> {
    const mockBuilding: Building = {
      domainId:"1",
      code: '1',
      designation:"A",
      description:"Building A",
      length: 10,
      width: 10,
      height: 10,
    }
    spyOn(buildingservice, 'listAllBuilding').and.returnValue(of([mockBuilding]));

    // Act

    component.getBuildings();

    // Assert
    expect(component.buildings).toEqual([mockBuilding]);
  });
});
