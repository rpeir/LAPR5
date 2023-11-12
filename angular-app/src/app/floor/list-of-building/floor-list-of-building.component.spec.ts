import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorListOfBuildingComponent } from './floor-list-of-building.component';

describe('ListOfBuldingComponent', () => {
  let component: FloorListOfBuildingComponent;
  let fixture: ComponentFixture<FloorListOfBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorListOfBuildingComponent]
    });
    fixture = TestBed.createComponent(FloorListOfBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
