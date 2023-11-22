import { TestBed } from '@angular/core/testing';

import { RoomService } from './room.service';
import { Room } from "./room";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { of, throwError } from "rxjs";

describe('RoomService', () => {
  let service: RoomService;
  let httpClientSpy: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    }).compileComponents();
    httpClientSpy = TestBed.inject(HttpClient);
    service = new RoomService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a room with the correct data', () => {
    const mockRoom = new Room();
    mockRoom.name = 'Room 1';
    mockRoom.floor = 1;
    mockRoom.building = 'Building A';
    mockRoom.description = 'Room description';
    mockRoom.category = 'classroom';

    spyOn(httpClientSpy, 'post').and.returnValue(of(mockRoom));

    service.createRoom(mockRoom).subscribe(
      room => {
        expect(room.name).toEqual('Room 1');
        expect(room.floor).toEqual(1);
        expect(room.building).toEqual('Building A');
        expect(room.description).toEqual('Room description');
        expect(room.category).toEqual('classroom');
      }
    )
  });

  it('should handle server error during room creation', () => {
    const mockRoom = new Room();
    // Set up the mock room data

    spyOn(httpClientSpy, 'post').and.returnValue(throwError(() =>'Server error'));

    service.createRoom(mockRoom).subscribe({
      next: () => fail('Expected an error, but operation succeeded'),
      error: (error) => {
        expect(error).toEqual('Server error');
      }
    });
  });

  it('should make a POST request with the correct data', () => {
    const mockRoom = new Room();
    // Set up the mock room data
    mockRoom.name = 'Room 1';
    mockRoom.floor = 1;
    mockRoom.building = 'Building A';
    mockRoom.description = 'Room description';
    mockRoom.category = 'classroom';

    const expectedUrl = service.baseUrl;
    const expectedHeaders = { "Content-Type": "application/json" };

    spyOn(httpClientSpy, 'post').and.returnValue(of(mockRoom));

    service.createRoom(mockRoom).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalledWith(expectedUrl, mockRoom, { headers: expectedHeaders });
    });
  });


});
