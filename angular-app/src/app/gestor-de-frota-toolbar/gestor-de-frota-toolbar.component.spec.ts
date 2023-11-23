import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GestorDeFrotaToolbarComponent } from './gestor-de-frota-toolbar.component';

describe('GestorDeFrotaToolbarComponent', () => {
  let component: GestorDeFrotaToolbarComponent;
  let fixture: ComponentFixture<GestorDeFrotaToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestorDeFrotaToolbarComponent],
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
    fixture = TestBed.createComponent(GestorDeFrotaToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to robots when goToRobots is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToRobots();
    expect(navigateSpy).toHaveBeenCalledWith(['/robots']);
  });

  it('should navigate to robot types when goToRobotTypes is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToRobotTypes();
    expect(navigateSpy).toHaveBeenCalledWith(['/robotTypes']);
  });

  it('should navigate to home when goToHome is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/gestor-de-frota']);
  });

  it('should navigate to login when goToLogin is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
});
