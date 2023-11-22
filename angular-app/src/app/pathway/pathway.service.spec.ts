import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PathwayService } from './pathway.service';
import { Pathway } from './pathway';

describe('ElevatorService', () => {
  let service: PathwayService;
  let httpTestingController: HttpTestingController;
  let baseUrl = 'http://localhost:4000/api/pathways';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PathwayService],
    });
    service = TestBed.inject(PathwayService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an pathway', () => {
    const mockPathway: Pathway = {
      domainId: '1',
      buildingSource:"Building A",
      buildingDestination: "Building B",
      floorSource: 1,
      floorDestination: 1,
      description: "Description",
    };

    // Act
    service.createPathway(mockPathway).subscribe((pathway) => {
      // Assert
      expect(pathway).toEqual(mockPathway);
    });

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockPathway);
  });
});
