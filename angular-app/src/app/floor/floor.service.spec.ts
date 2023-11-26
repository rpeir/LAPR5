import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FloorService } from './floor.service';
import { Floor } from './floor';
import { environment } from "../../environments/environment";

describe('FloorService', () => {
  let service: FloorService;
  let httpTestingController: HttpTestingController;
  let baseUrl = environment.apiURL+'/api/floors';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FloorService],
    });
    service = TestBed.inject(FloorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })
  afterEach(() => {
    httpTestingController.verify();
  });
it('should be created', () => {
    expect(service).toBeTruthy();
  });
it('should create a floor', () => {
  const mockFloor: Floor = {
    domainId: '1',
    building: 'Building A',
    description: 'Floor description',
    floorNr: 1,
  };
  // Act
  service.createFloor(mockFloor).subscribe((floor) => {
    // Assert
    expect(floor).toEqual(mockFloor);
  });
  // Assert
  const req = httpTestingController.expectOne(`${baseUrl}`);
  expect(req.request.method).toEqual('POST');
  req.flush(mockFloor);
  });
it('should update a floor', () => {
  const mockFloor: Floor = {
    domainId: '1',
    building: 'Building A',
    description: 'Floor description',
    floorNr: 1,
  };
  // Act
  service.updateBuildingFloor(mockFloor).subscribe((floor) => {
    // Assert
    expect(floor).toEqual(mockFloor);
  });
  // Assert
  const req = httpTestingController.expectOne(`${baseUrl}`);
  expect(req.request.method).toEqual('PUT');
  req.flush(mockFloor);
  });
});
