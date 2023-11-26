import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuildingService } from './building.service';
import { Building } from './building';
import { environment } from "../../environments/environment";

describe('ElevatorService', () => {
  let service: BuildingService;
  let httpTestingController: HttpTestingController;
  let baseUrl = environment.apiURL + '/api/buildings';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuildingService],
    });
    service = TestBed.inject(BuildingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an elevator', () => {
    const mockBuilding: Building= {
      domainId: '1',
      code: '1232',
      designation: 'Building A',
      description: 'Building description',
      length: 10,
      width: 10,
      height: 10,
    };

    // Act
    service.createBuilding(mockBuilding).subscribe((building) => {
      // Assert
      expect(building).toEqual(mockBuilding);
    });

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockBuilding);
  });
 /* it('should update an elevator', () => {
    const mockElevator: Building = {
      domainId: '1',
      code: '1232',
      designation: 'Building A',
      description: 'Building description',
      length: 10,
      width: 10,
      height: 10,
    };

    // Act
    service.updateBuilding(mockElevator).subscribe((building) => {
      // Assert
      expect(building).toEqual(mockElevator);
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

  */
  it('should list all elevators', () => {
    const mockBuilding: Building[] = [{
      domainId: '1',
      code: '1232',
      designation: 'Building A',
      description: 'Building description',
      length: 10,
      width: 10,
      height: 10,
    }];

    // Act
    service.getBuildings().subscribe((buildings) => {
      // Assert
      expect(buildings).toEqual(mockBuilding);
    });

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}/?buildingDesignation=Building A`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBuilding);
  })
});
