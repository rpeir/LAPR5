import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from "rxjs";
import { RobotService } from "./robot.service";
import { Robot } from "./robot";
import { environment } from "../../environments/environment";

describe('RobotService', () => {
  let service: RobotService;
  let httpClientSpy: HttpClient;
  let httpTestingController: HttpTestingController;
  let baseUrl = environment.apiURL+'/api/robots';

  const DEFAULT_ROBOT : Robot = {
    id: '123',
    nickName: 'TestRobot',
    serialNr: '123',
    robotCode: '123',
    robotType: 'TestType',
    description: 'TestDescription'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    }).compileComponents();
    httpClientSpy = TestBed.inject(HttpClient);
    service = new RobotService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a robot with the correct data', () => {
    const mockRobot = DEFAULT_ROBOT;

    spyOn(httpClientSpy, 'post').and.returnValue(of(mockRobot));

    service.createRobot(mockRobot).subscribe(
      robot => {
        expect(robot).toEqual(mockRobot);
      }
    )
  });

  it('should handle server error during robot creation', () => {
    const mockRobot = {} as Robot;
    const errorMsg = 'Some error';

    spyOn(httpClientSpy, 'post').and.returnValue(throwError(() => errorMsg));

    service.createRobot(mockRobot).subscribe({
      next: () => fail('Expected an error, but operation succeeded'),
      error: (error) => {
        expect(error).toEqual(errorMsg);
      }
    });
  });

  it('should list all robots', () => {
    const mockRobots: Robot[] = [
      DEFAULT_ROBOT,
      DEFAULT_ROBOT
    ];

    spyOn(httpClientSpy, 'get').and.returnValue(of(mockRobots));

    service.listAllRobots().subscribe((robots) => {
      expect(robots).toEqual(mockRobots);
    });
  });

  it('should disable a robot by nickname', () => {
    const nickName = DEFAULT_ROBOT.nickName;

    spyOn(httpClientSpy, 'patch').and.returnValue(of(DEFAULT_ROBOT));

    service.disableRobotByNickName(nickName).subscribe((robot) => {
      expect(robot.nickName).toBe(nickName);
    });
  });

  it('should disable a robot by code', () => {
    const robotCode = DEFAULT_ROBOT.robotCode

    spyOn(httpClientSpy, 'patch').and.returnValue(of(DEFAULT_ROBOT));

    service.disableRobotByCode(robotCode).subscribe((robot) => {
      expect(robot.robotCode).toBe(robotCode);
    });
  });
  it('should list all robots', () => {
    const mockRobots: Robot[] = [
      DEFAULT_ROBOT,
      DEFAULT_ROBOT
    ];

    spyOn(httpClientSpy, 'get').and.returnValue(of(mockRobots));

    service.listAllRobots().subscribe((robots) => {
      expect(robots).toEqual(mockRobots);
    });
  })
});
