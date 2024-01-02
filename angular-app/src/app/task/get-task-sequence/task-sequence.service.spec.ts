import { TestBed } from '@angular/core/testing';

import { TaskSequenceService } from './task-sequence.service';

describe('TaskSequenceService', () => {
  let service: TaskSequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
