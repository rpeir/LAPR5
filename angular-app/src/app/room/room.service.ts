import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Room } from "./room";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.apiURL + '/api/rooms';

  createRoom(room: Room) {
    return this.httpClient.post<Room>(this.baseUrl, room,
      {headers: {"Content-Type": "application/json"}});
  }

  getRooms(building:string | undefined, floor:string | undefined) {
    const url = `${this.baseUrl}/roomByBuildingAndFloor?building=${building}&floor=${floor}`;
    return this.httpClient.get<Room[]>(url, {headers: {"Content-Type": "application/json"}});
  }

  getRoomById(roomId: string) {
    return this.httpClient.get<Room>(`${this.baseUrl}/${roomId}`, {headers: {"Content-Type": "application/json"}});
  }
}
