import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorDeSistemaComponent } from './administrador-de-sistema.component';
import { GestorDeFrotaToolbarComponent } from "../gestor-de-frota-toolbar/gestor-de-frota-toolbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

describe('GestorDeFrotaComponent', () => {
  let component: AdministradorDeSistemaComponent;
  let fixture: ComponentFixture<AdministradorDeSistemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministradorDeSistemaComponent, GestorDeFrotaToolbarComponent],
      imports: [MatToolbarModule, MatIconModule, MatMenuModule]
    });
    fixture = TestBed.createComponent(AdministradorDeSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
