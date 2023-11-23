import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingComponent } from './building.component';

describe('BuildingComponent', () => {
  let component: BuildingComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingComponent]
    });
    component = new BuildingComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
