import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBuildingComponent } from './list-of-building.component';

describe('ListOfBuildingComponent', () => {
  let component: ListOfBuildingComponent;
  let fixture: ComponentFixture<ListOfBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfBuildingComponent]
    });
    fixture = TestBed.createComponent(ListOfBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
