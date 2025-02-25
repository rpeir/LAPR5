import { Injectable } from '@angular/core';
import { Floor } from './floor';
import { HttpClient } from '@angular/common/http';
import { Building } from '../building/building';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  constructor(private httpClient: HttpClient) {}

  private floorUrl = environment.apiURL + '/api/floors';
  createFloor(floor: Floor) {
    return this.httpClient.post<Floor>(`${this.floorUrl}`, floor, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'body',
      responseType: 'json',
    });
  }

  getFloorsOfBuilding(building: string) {
    return this.httpClient.get<Floor[]>(`${this.floorUrl}/building?building=${building}`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  updateBuildingFloor(floor: Floor) {
    return this.httpClient.put<Floor>(`${this.floorUrl}`, floor);
  }

  getBuildingFloorMaxMin(max: number, min: number) {
    return this.httpClient.get<Building[]>(`${this.floorUrl}/building/max/min?max=${max}&min=${min}`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getFloorsOfBuildingWithPathways(building: string) {
    return this.httpClient.get<Map<number, Floor[]>>(`${this.floorUrl}/with-pathways?buildingDesignation=${building}`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  editFloor(newFloor: Floor) {
    return this.httpClient.put<Floor>(`${this.floorUrl}`, newFloor, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'body',
      responseType: 'json',
    });
  }

  uploadFloorMap(floor: Floor) {
    return this.httpClient.patch<Floor>(`${this.floorUrl}`, floor, { observe: 'body', responseType: 'json' });
  }

  getFloorById(floorId: string) {
    return this.httpClient.get<Floor>(`${this.floorUrl}/${floorId}`)
  }
}
