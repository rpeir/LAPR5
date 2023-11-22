import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RobotService } from './robot.service';
import { Robot } from './robot';

describe('ElevatorService', () => {
  let service: RobotService;
  let httpTestingController: HttpTestingController;
  let baseUrl = 'http://localhost:4000/api/robots';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RobotService],
    });
    service = TestBed.inject(RobotService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all robots', () => {
    const mockRobot: Robot[] = [{
      robotCode: '1',
    nickName:"Robot 1",
    robotType:"Delivery",
    serialNr:"12345",
    description:"Robot description",
    }];

    // Act
     service.listAllRobots().subscribe((robot) => {
        // Assert
        expect(robot).toEqual(mockRobot);
      });
    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockRobot);
  });
});
