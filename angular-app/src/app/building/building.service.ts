import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Building } from "./building";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private httpClient: HttpClient) { }

  private buildingUrl = 'http://localhost:4000/api/buildings';


  getBuildings() : Observable<Building[]> {
    return this.httpClient.get<Building[]>(`${this.buildingUrl}`,
      {observe: "body", responseType: "json"});
  }
  createBuilding(building:Building){
    return this.httpClient.post<Building>(this.buildingUrl,building)
  }
}
