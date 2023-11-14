import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorToolBarComponent } from './elevator-tool-bar.component';

describe('ElevatorToolBarComponent', () => {
  let component: ElevatorToolBarComponent;
  let fixture: ComponentFixture<ElevatorToolBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorToolBarComponent]
    });
    fixture = TestBed.createComponent(ElevatorToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
