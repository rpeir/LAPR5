import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { RobotType } from "./robot-type";
import { RobotTypeService } from "./robot-type.service";

describe('RobotTypeService', () => {
  let service: RobotTypeService;
  let httpClientSpy: HttpClient;

  const DEFAULT_ROBOTTYPE : RobotType = {
    id: "1",
    name: "robotType",
    taskTypes: ["task1", "task2"],
    robotTypeModel: "model",
    brand: "brand",
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    }).compileComponents();
    httpClientSpy = TestBed.inject(HttpClient);
    service = new RobotTypeService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a robot type with the correct data', () => {
    const mockRobotType = DEFAULT_ROBOTTYPE;

    spyOn(httpClientSpy, 'post').and.returnValue(of(mockRobotType));

    service.createRobotType(mockRobotType).subscribe(
      robotType => {
        expect(robotType).toEqual(mockRobotType);
      }
    )
  });

  it('should handle server error during robot creation', () => {
    const mockRobotType = {} as RobotType;
    const errorMsg = 'Some error';

    spyOn(httpClientSpy, 'post').and.returnValue(throwError(() => errorMsg));

    service.createRobotType(mockRobotType).subscribe({
      next: () => fail('Expected an error, but operation succeeded'),
      error: (error) => {
        expect(error).toEqual(errorMsg);
      }
    });
  });

  it('should list all robots', () => {
    const mockRobotTypes: RobotType[] = [
      DEFAULT_ROBOTTYPE,
      DEFAULT_ROBOTTYPE
    ];

    spyOn(httpClientSpy, 'get').and.returnValue(of(mockRobotTypes));

    service.getRobotTypes().subscribe((robots) => {
      expect(robots).toEqual(mockRobotTypes);
    });
  });
});
