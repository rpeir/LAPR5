import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingsServedComponent } from './list-buildings-served.component';

describe('ListBuildingsServedComponent', () => {
  let component: ListBuildingsServedComponent;
  let fixture: ComponentFixture<ListBuildingsServedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBuildingsServedComponent]
    });
    fixture = TestBed.createComponent(ListBuildingsServedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
