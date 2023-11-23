import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PathService {

  constructor(private httpCliente: HttpClient) { }

  private pathUrl = "http://localhost:4000/api/planning/path";

  getPathBetweenFloorsLessBuildings(buildingSource: string | undefined, floorSource: string | undefined, buildingDestination: string | undefined, floorDestination: string | undefined) {
    return this.httpCliente.get<any>(`${this.pathUrl}/lessBuildings?sourceBuilding=${buildingSource}&sourceFloor=${floorSource}&destinationBuilding=${buildingDestination}&destinationFloor=${floorDestination}`,
      {observe: "body", responseType: "json"});
  }

  getPathBetweenFloorsLessElevators(buildingSource: string | undefined, floorSource: string | undefined, buildingDestination: string | undefined, floorDestination: string | undefined) {
    return this.httpCliente.get<any>(`${this.pathUrl}/lessElevators?sourceBuilding=${buildingSource}&sourceFloor=${floorSource}&destinationBuilding=${buildingDestination}&destinationFloor=${floorDestination}`,
      {observe: "body", responseType: "json"});
  }

  getPathRoomToRoomLessElevators(buildingSource: string | undefined, floorSource: string | undefined, buildingDestination: string | undefined, floorDestination: string | undefined, roomSource: string | undefined, roomDestination: string | undefined) {
    return this.httpCliente.get<any>(`${this.pathUrl}/lessElevators/roomToroom?sourceBuilding=${buildingSource}&sourceFloor=${floorSource}&destinationBuilding=${buildingDestination}&destinationFloor=${floorDestination}&roomSource=${roomSource}&roomDestination=${roomDestination}`,
      {observe: "body", responseType: "json"});
  }

  getPathRoomToRoomLessBuildings(buildingSource: string | undefined, floorSource: string | undefined, buildingDestination: string | undefined, floorDestination: string | undefined, roomSource: string | undefined, roomDestination: string | undefined) {
    return this.httpCliente.get<any>(`${this.pathUrl}/lessBuildings/roomToroom?sourceBuilding=${buildingSource}&sourceFloor=${floorSource}&destinationBuilding=${buildingDestination}&destinationFloor=${floorDestination}&roomSource=${roomSource}&roomDestination=${roomDestination}`,
      {observe: "body", responseType: "json"});
  }
}
