import { TestBed } from '@angular/core/testing';
import { RobotComponent } from "./robot.component";


describe('RobotComponent', () => {
  let component: RobotComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
      .compileComponents();
    component = new RobotComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
