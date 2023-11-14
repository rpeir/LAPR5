import { Injectable } from '@angular/core';
import { Floor } from "./floor";
import { HttpClient } from "@angular/common/http";
import { Building } from "../building/building";

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private httpClient: HttpClient) { }

  private floorUrl = "http://localhost:4000/api/floors";
  createFloor(floor: Floor) {
    return this.httpClient.post<Floor>(`${this.floorUrl}`, floor,
      {headers: {"Content-Type": "application/json"}, observe: "body", responseType: "json"});
  }

  getFloorsOfBuilding(building: string) {
    return this.httpClient.get<Floor[]>(`${this.floorUrl}/building?building=${building}`,
      {observe: "body", responseType: "json"});
  }


  updateBuildingFloor(floor: Floor) {
    return this.httpClient.put<Floor>(`${this.floorUrl}`, floor);
  }

  getBuildingFloorMaxMin(max: number, min: number) {
    return this.httpClient.get<Building[]>(`${this.floorUrl}/building/max/min?max=${max}&min=${min}`,
      {observe: "body", responseType: "json"});
  }

}
