import { TestBed } from '@angular/core/testing';

import { PathService } from './path.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('PathService', () => {
  let service: PathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
