import { TestBed } from '@angular/core/testing';

import { CreateRobotService } from './create-robot.service';

describe('CreateRobotService', () => {
  let service: CreateRobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
