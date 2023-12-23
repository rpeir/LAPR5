import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRobotComponent } from './select-robot.component';

describe('SelectRobotComponent', () => {
  let component: SelectRobotComponent;
  let fixture: ComponentFixture<SelectRobotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectRobotComponent]
    });
    fixture = TestBed.createComponent(SelectRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
