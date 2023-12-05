import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdministradorDeSistemaToolbarComponent } from './administrador-de-sistema-toolbar.component';

describe('GestorDeTarefasToolbarComponent', () => {
  let component: AdministradorDeSistemaToolbarComponent;
  let fixture: ComponentFixture<AdministradorDeSistemaToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministradorDeSistemaToolbarComponent],
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
    fixture = TestBed.createComponent(AdministradorDeSistemaToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to robots when goToRobots is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToOptimizationCriteria();
    expect(navigateSpy).toHaveBeenCalledWith(['/path/optimization-criteria']);
  });

  it('should navigate to home when goToHome is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/gestor-de-tarefas']);
  });

  it('should navigate to login when goToLogin is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
});
