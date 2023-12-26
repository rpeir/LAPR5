import { TestBed } from '@angular/core/testing';
import { DisableComponent } from "./disable.component";
import { RobotService } from "../robot.service";
import { Robot } from "../robot";
import { of } from "rxjs";
import { HttpClientModule } from "@angular/common/http";


describe('DisableRobotComponent', () => {
  let component: DisableComponent;
  let robotService: RobotService;

  const DEFAULT_ROBOT : Robot = {
    id: '123',
    nickName: 'TestRobot',
    serialNr: '123',
    robotCode: '123',
    robotType: 'TestType',
    description: 'TestDescription'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
      .compileComponents();
    robotService = TestBed.inject(RobotService);
    component = new DisableComponent(robotService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable robot by nickname', () => {
    // Arrange
    const mockRobot: Robot = {
      ...DEFAULT_ROBOT,
    };

    component.disableOption = 'nickName';
    component.nickName = DEFAULT_ROBOT.nickName;

    spyOn(robotService,'disableRobotByNickName').and.returnValue(of(mockRobot));
    spyOn(window, 'alert');

    // Act
    component.disableRobot();

    // Assert
    expect(robotService.disableRobotByNickName).toHaveBeenCalledWith(DEFAULT_ROBOT.nickName);
    expect(window.alert).toHaveBeenCalledWith(`Robot ${mockRobot.nickName} disabled`);
  });

  it ('should not disable robot by nickname when nickname is empty', () => {
    // Arrange
    component.disableOption = 'nickName';
    component.nickName = '';

    spyOn(robotService,'disableRobotByNickName');
    spyOn(window, 'alert');

    // Act
    component.disableRobot();

    // Assert
    expect(robotService.disableRobotByNickName).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(`Please insert nickname`);
  });

  it('should disable robot by code', () => {
    // Arrange
    const mockRobot: Robot = {
      ...DEFAULT_ROBOT,
    };

    component.disableOption = 'code';
    component.robotCode = DEFAULT_ROBOT.robotCode;

    spyOn(robotService,'disableRobotByCode').and.returnValue(of(mockRobot));
    spyOn(window, 'alert');

    // Act
    component.disableRobot();

    // Assert
    expect(robotService.disableRobotByCode).toHaveBeenCalledWith(DEFAULT_ROBOT.robotCode);
    expect(window.alert).toHaveBeenCalledWith(`Robot ${mockRobot.nickName} disabled`);
  });

  it ('should not disable robot by code when code is empty', () => {
    // Arrange
    component.disableOption = 'code';
    component.robotCode = '';

    spyOn(robotService,'disableRobotByCode');
    spyOn(window, 'alert');

    // Act
    component.disableRobot();

    // Assert
    expect(robotService.disableRobotByCode).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(`Please insert code`);
  });

  it('should not disable robot when option is not selected', () => {
    // Arrange
    component.disableOption = undefined;

    spyOn(robotService,'disableRobotByCode');
    spyOn(robotService,'disableRobotByNickName');
    spyOn(window, 'alert');

    // Act
    component.disableRobot();

    // Assert
    expect(robotService.disableRobotByCode).not.toHaveBeenCalled();
    expect(robotService.disableRobotByNickName).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(`Please select an option`);
  });

});
