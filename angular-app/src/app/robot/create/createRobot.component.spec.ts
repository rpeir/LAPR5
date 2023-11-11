import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRobotComponent } from './createRobot.component';

describe('CreateComponent', () => {
  let component: CreateRobotComponent;
  let fixture: ComponentFixture<CreateRobotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRobotComponent]
    });
    fixture = TestBed.createComponent(CreateRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
