import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoomSidenavComponent } from './room-sidenav.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RoomSidenavComponent', () => {
  let component: RoomSidenavComponent;
  let fixture: ComponentFixture<RoomSidenavComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomSidenavComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(RoomSidenavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/rooms/create" when "Create Room" option is clicked', () => {
    // Spy on the router navigate method
    const navigateSpy = spyOn(router, 'navigate');

    // Trigger the click event on the "Create Room" option
    const createRoomOption = fixture.debugElement.query(By.css('#create-room-option'));
    createRoomOption.triggerEventHandler('click', null);

    // Check if the router navigate method was called with the correct route
    expect(navigateSpy).toHaveBeenCalledWith(['/rooms/create']);
  });
});
