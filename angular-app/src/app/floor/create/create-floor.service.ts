import { Injectable } from '@angular/core';
import { Floor } from "../floor";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CreateFloorService {

  constructor(private httpClient: HttpClient) { }

  private floorUrl = "http://localhost:4000/api/floors";
  createFloor(floor: Floor) {
    return this.httpClient.post<Floor>(`${this.floorUrl}`, floor);
  }
}
