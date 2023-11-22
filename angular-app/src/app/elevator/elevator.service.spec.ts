import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElevatorService } from './elevator.service';
import { Elevator } from './elevator';

describe('ElevatorService', () => {
  let service: ElevatorService;
  let httpTestingController: HttpTestingController;
  let baseUrl = 'http://localhost:4000/api/elevators';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElevatorService],
    });
    service = TestBed.inject(ElevatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an elevator', () => {
    const mockElevator: Elevator = {
      id: '1',
      designation: 'Elevator 1',
      buildingDesignation: 'Building A',
      floorsServed: [1, 2, 3],
      brand: 'Brand',
      modelE: 'Model',
      serialNumber: '12345',
      description: 'Elevator description',
    };

    // Act
    service.createElevator(mockElevator).subscribe((elevator) => {
      // Assert
      expect(elevator).toEqual(mockElevator);
    });

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockElevator);
  });
  it('should update an elevator', () => {
    const mockElevator: Elevator = {
      id: '1',
      designation: 'Elevator 1',
      buildingDesignation: 'Building A',
      floorsServed: [1, 2, 3],
      brand: 'Brand',
      modelE: 'Model',
      serialNumber: '12345',
      description: 'Elevator description',
    };

    // Act
    service.updateElevator(mockElevator).subscribe((elevator) => {
      // Assert
      expect(elevator).toEqual(mockElevator);
    });

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}`);
    expect(req.request.method).toEqual('PATCH');
    req.flush(mockElevator);
  })
  it('should replace an elevator', () => {
    const mockElevator: Elevator = {
      id: '1',
      designation: 'Elevator 1',
      buildingDesignation: 'Building A',
      floorsServed: [1, 2, 3],
      brand: 'Brand',
      modelE: 'Model',
      serialNumber: '12345',
      description: 'Elevator description',
    };

    // Act
    service.replaceElevator(mockElevator).subscribe((elevator) => {
      // Assert
      expect(elevator).toEqual(mockElevator);
    });

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockElevator);
  })
  it('should list all elevators', () => {
    const mockElevator: Elevator[] = [{
      id: '1',
      designation: 'Elevator 1',
      buildingDesignation: 'Building A',
      floorsServed: [1, 2, 3],
      brand: 'Brand',
      modelE: 'Model',
      serialNumber: '12345',
      description: 'Elevator description',
    }];

    // Act
    service.listAllElevators('Building A').subscribe((elevator) => {
      // Assert
      expect(elevator).toEqual(mockElevator);
    });

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}/?buildingDesignation=Building A`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockElevator);
  })
});
