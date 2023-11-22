import { TestBed } from '@angular/core/testing';
import { RoomComponent } from "./room.component";


describe('RoomComponent', () => {
  let component: RoomComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
      .compileComponents();
    component = new RoomComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
