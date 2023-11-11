import { TestBed } from '@angular/core/testing';

import { CreateFloorService } from './create-floor.service';

describe('CreateFloorService', () => {
  let service: CreateFloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateFloorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
