import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Room } from "./room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:4000/api/rooms';

  createRoom(room: Room) {
    return this.httpClient.post<Room>(this.baseUrl, room,
      {headers: {"Content-Type": "application/json"}});
  }

  getRooms(building:string | undefined, floor:string | undefined) {
    const url = `${this.baseUrl}/roomByBuildingAndFloor?building=${building}&floor=${floor}`;
    return this.httpClient.get<Room[]>(url, {headers: {"Content-Type": "application/json"}});
  }
}
