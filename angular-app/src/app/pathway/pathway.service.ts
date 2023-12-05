import { Injectable } from '@angular/core';
import { Pathway } from "./pathway";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PathwayService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.apiURL + '/api/pathways';

  createPathway(pathway: Pathway) {
     return this.httpClient.post<Pathway>(this.baseUrl, pathway,
       {headers: {"Content-Type": "application/json"}});
  }

  editPathway(pathway: Pathway) {
    let domainId = pathway.domainId;
    const pathwayCopy = Object.assign({}, pathway);
    pathwayCopy.domainId = undefined;
    return this.httpClient.patch<Pathway>(this.baseUrl + `?domainId=${domainId}`, pathwayCopy,
      {headers: {"Content-Type": "application/json"}});
  }

  listPathwaysBetweenBuildings(buildingSource: string, buildingDestination: string) {
    return this.httpClient.get<Pathway[]>(this.baseUrl + `?buildingSource=${buildingSource}&buildingDestination=${buildingDestination}`);
  }

  findAll() {
    return this.httpClient.get<Pathway[]>(this.baseUrl);
  }
}
