import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SelectRobotComponent } from './select-robot.component';
import { RobotService } from '../../../robot/robot.service';
import { Robot } from '../../../robot/robot';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

describe('SelectRobotComponent', () => {
  let component: SelectRobotComponent;
  let fixture: ComponentFixture<SelectRobotComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<SelectRobotComponent>>;
  let mockRobotService: jasmine.SpyObj<RobotService>;

  const DEFAULT_ROBOTS: Robot[] = [
    {
      id: '1',
      robotCode: '1234',
      nickName: 'Test robot',
      robotType: 'Test robot type',
      serialNr: '1234',
      description: 'Test robot description',
      state: 'Available',
    },
  ];

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockRobotService = jasmine.createSpyObj('RobotService', ['getRobotsByTaskType']);

    TestBed.configureTestingModule({
      declarations: [SelectRobotComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { taskType: 'TaskType' } },
        { provide: RobotService, useValue: mockRobotService },
      ], imports : [
        MatFormFieldModule, MatSelectModule
      ]
    });

    fixture = TestBed.createComponent(SelectRobotComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch robots on ngOnInit', () => {
    const mockRobots = DEFAULT_ROBOTS;
    mockRobotService.getRobotsByTaskType.and.returnValue(of(mockRobots));

    component.ngOnInit();

    expect(component.robots).toEqual(mockRobots);
  });

  it('should close dialog when selecting a robot', () => {
    const mockRobot = DEFAULT_ROBOTS[0];
    component.selectRobot(mockRobot);

    expect(mockDialogRef.close).toHaveBeenCalledWith(mockRobot);
  });
});
