import { Injectable } from '@angular/core';
import { Pathway } from "./pathway";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PathwayService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:4000/api/pathways';

  createPathway(pathway: Pathway) {
     return this.httpClient.post<Pathway>(this.baseUrl, pathway,
       {headers: {"Content-Type": "application/json"}});
  }
}
