import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotToolBarComponent } from './robot-tool-bar.component';

describe('RobotToolBarComponent', () => {
  let component: RobotToolBarComponent;
  let fixture: ComponentFixture<RobotToolBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotToolBarComponent]
    });
    fixture = TestBed.createComponent(RobotToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
