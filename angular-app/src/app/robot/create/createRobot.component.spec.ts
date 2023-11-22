import { TestBed } from '@angular/core/testing';
import { CreateRobotComponent } from './createRobot.component';
import { RobotService } from "../robot.service";
import { HttpClientModule } from "@angular/common/http";
import { Robot } from "../robot";
import { of } from "rxjs";
import { RobotTypeService } from "../../robot-type/robot-type.service";
import { Location } from "@angular/common";


describe('CreateRobotComponent', () => {
  let component: CreateRobotComponent;
  let robotService: RobotService;
  let robotTypeService: RobotTypeService;
  let location: Location;

  const DEFAULT_ROBOT : Robot = {
    nickName: 'TestRobot',
    serialNr: '123',
    robotCode: '123',
    robotType: 'TestType',
    description: 'TestDescription'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [RobotService]
    })
      .compileComponents();
    robotService = TestBed.inject(RobotService);
    robotTypeService = TestBed.inject(RobotTypeService);
    location = TestBed.inject(Location);
    component = new CreateRobotComponent(robotTypeService, location, robotService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful robot creation', ()=> {
    const mockRobot: Robot = DEFAULT_ROBOT;
    component.robot = mockRobot;
    spyOn(robotService, 'createRobot').and.returnValue(of(mockRobot));
    spyOn(window, 'alert');

    // Act
    component.createRobot();

    // Assert
    const expectedAlertMessage =
      "Robot created successfully \n" +
      `Nickname: ${mockRobot.nickName}\n` +
      `Robot Type: ${mockRobot.robotType}\n` +
      `Description: ${mockRobot.description}\n` +
      `Robot code: ${mockRobot.robotCode}\n` +
      `Robot serial number: ${mockRobot.serialNr}\n`;

    const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];

    expect(robotService.createRobot).toHaveBeenCalledWith(component.robot);
    expect(actualAlertMessage).toMatch(expectedAlertMessage);
  });

});
