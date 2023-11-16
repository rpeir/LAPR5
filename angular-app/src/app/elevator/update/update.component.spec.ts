import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorUpdateComponent } from './update.component';

describe('ElevatorUpdateComponent', () => {
  let component: ElevatorUpdateComponent;
  let fixture: ComponentFixture<ElevatorUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorUpdateComponent]
    });
    fixture = TestBed.createComponent(ElevatorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
