import { TestBed } from '@angular/core/testing';

import { BuildingService } from './building.service';

describe('BuildigService', () => {
  let service: BuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
