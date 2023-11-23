import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GestorDeCampusToolbarComponent } from './gestor-de-campus-toolbar.component';

describe('GestorDeCampusToolbarComponent', () => {
  let component: GestorDeCampusToolbarComponent;
  let fixture: ComponentFixture<GestorDeCampusToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestorDeCampusToolbarComponent],
      imports: [
        RouterTestingModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorDeCampusToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to buildings when goToBuildings is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToBuildings();
    expect(navigateSpy).toHaveBeenCalledWith(['/buildings']);
  });

  it('should navigate to elevators when goToElevators is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToElevators();
    expect(navigateSpy).toHaveBeenCalledWith(['/elevators']);
  });

  it('should navigate to floors when goToFloors is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToFloors();
    expect(navigateSpy).toHaveBeenCalledWith(['/floors']);
  });

  it('should navigate to rooms when goToRooms is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToRooms();
    expect(navigateSpy).toHaveBeenCalledWith(['/rooms']);
  });

  it('should navigate to pathways when goToPathways is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToPathways();
    expect(navigateSpy).toHaveBeenCalledWith(['/pathways']);
  });

  it('should navigate to home when goToHome is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/gestor-de-campus']);
  });

  it('should navigate to login when goToLogin is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
});
