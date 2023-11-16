import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorReplaceComponent } from './replace.component';

describe('CreateComponent', () => {
  let component: ElevatorReplaceComponent;
  let fixture: ComponentFixture<ElevatorReplaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorReplaceComponent]
    });
    fixture = TestBed.createComponent(ElevatorReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
