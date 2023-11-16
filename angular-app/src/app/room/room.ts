export class Room {
  name !: string;
  description !: string;
  category !: string;
  floor !: number;
  building !: string;
}

export enum RoomCategory {
  CLASSROOM = 'classroom',
  LABORATORY = 'laboratory',
  OFFICE = 'office',
  AUDITORIUM = 'auditorium',
  OTHER = 'other'

}
