import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBetweenBuildingsComponent } from './list-between-buildings.component';

describe('ListBetweenBuildingsComponent', () => {
  let component: ListBetweenBuildingsComponent;
  let fixture: ComponentFixture<ListBetweenBuildingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBetweenBuildingsComponent]
    });
    fixture = TestBed.createComponent(ListBetweenBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
