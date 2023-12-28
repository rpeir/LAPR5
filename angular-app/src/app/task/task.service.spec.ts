import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { environment } from '../../environments/environment';
import { Task } from "./task";
import { TaskRequest } from "./taskRequest";

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;
  const DEFAULT_TASKS: Task[] = [
    {
      id: '1234',
      taskDescription: 'Test task',
      type: 'Delivery',
      userId: '1234',
      status: 'Pending',
      pickupRoomId: '1234',
      deliveryRoomId: '1234',
      robot: "1234",
      taskRequestId: '1234',
      senderName: 'Test sender name',
      receiverName: 'Test receiver name',
      senderContact: 'Test sender contact',
      receiverContact: 'Test receiver contact',
      confirmationCode: '1234'
    }
  ];

  const DEFAULT_TASK_REQUESTS: TaskRequest[] = [
    {
      ...DEFAULT_TASKS[0],
      description: 'Test task request',
      requestStatus: 'Pending'
    }
  ]


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve pending tasks', () => {
    const mockTasks = DEFAULT_TASKS;

    service.getPendingTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/tasks/pending`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should retrieve pending task requests', () => {
    const mockTaskRequests = DEFAULT_TASK_REQUESTS;

    service.getPendingTaskRequests().subscribe(taskRequests => {
      expect(taskRequests).toEqual(mockTaskRequests);
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/taskRequests?status=pending`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTaskRequests);
  });

  it('should accept a task request', () => {
    const requestId = DEFAULT_TASKS[0].taskRequestId;
    const robotId =  DEFAULT_TASKS[0].robot ?? '';
    const mockTask = DEFAULT_TASKS[0];

    service.acceptTaskRequest(requestId, robotId).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ taskRequestId: requestId, robotId: robotId });
    req.flush(mockTask);
  });

  it('should reject a task request', () => {
    const taskId = DEFAULT_TASK_REQUESTS[0].id;
    const mockTaskRequest = DEFAULT_TASK_REQUESTS[0];

    service.rejectTaskRequest(taskId).subscribe(taskRequest => {
      expect(taskRequest).toEqual(mockTaskRequest);
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/taskRequests/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockTaskRequest);
  });
});
