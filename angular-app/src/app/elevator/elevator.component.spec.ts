import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorComponent } from './elevator.component';

describe('ElevatorComponent', () => {
  let component: ElevatorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorComponent]
    });
    component = new ElevatorComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
