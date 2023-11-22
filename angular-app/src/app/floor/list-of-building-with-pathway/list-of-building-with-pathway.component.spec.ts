import { TestBed } from '@angular/core/testing';
import { ListOfBuildingWithPathwayComponent } from "./list-of-building-with-pathway.component";
import { BuildingService } from "../../building/building.service";
import { FloorService } from "../floor.service";
import { HttpClientModule } from "@angular/common/http";
import { throwError } from "rxjs";

describe('ListOfBuildingWithPathwayComponent', () => {
  let component: ListOfBuildingWithPathwayComponent;
  let buildingService: BuildingService;
  let floorService: FloorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
    })
      .compileComponents();
    buildingService = TestBed.inject(BuildingService);
    floorService = TestBed.inject(FloorService);
    component = new ListOfBuildingWithPathwayComponent(floorService, buildingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle errors when getting floors with pathways', () => {
    const building = 'Building1';
    spyOn(floorService, 'getFloorsOfBuildingWithPathways').and.returnValue(throwError({ error: 'Some error' }));
    spyOn(window, 'alert'); // Spy on the window.alert method

    component.listFloorsOfBuildingWithPathways(building);

    expect(component.connections).toBeUndefined();
    expect(window.alert).toHaveBeenCalled();
  });

});
