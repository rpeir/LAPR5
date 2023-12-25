import { TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import {HttpClientModule} from "@angular/common/http";
import {Robot} from "../robot";
import {of} from "rxjs";
import {RobotService} from "../robot.service";


describe('ListComponent', () => {
  let component: ListComponent;
  let robotService: RobotService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [RobotService]
    })
      .compileComponents();
    robotService = TestBed.inject(RobotService);


    component = new ListComponent(robotService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle successful robot listing', ()=> {
    const mockRobot: Robot = {
      id: '1',
      robotCode: '1',
      nickName: 'Robot 1',
      robotType: 'Delivery',
      serialNr: '12345',
      description: 'Robot description',
      state: 'true'
    }
    spyOn(robotService, 'listAllRobots').and.returnValue(of([mockRobot]));

    // Act
    component.listRobots();

    // Assert
    expect(component.robots).toEqual([mockRobot]);
  });
});
