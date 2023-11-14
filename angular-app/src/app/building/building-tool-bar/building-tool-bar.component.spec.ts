import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingToolBarComponent } from './building-tool-bar.component';

describe('BuildingToolBarComponent', () => {
  let component: BuildingToolBarComponent;
  let fixture: ComponentFixture<BuildingToolBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingToolBarComponent]
    });
    fixture = TestBed.createComponent(BuildingToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
