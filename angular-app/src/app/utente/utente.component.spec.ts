import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtenteComponent } from './utente.component';
import { GestorDeFrotaToolbarComponent } from "../gestor-de-frota-toolbar/gestor-de-frota-toolbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

describe('GestorDeFrotaComponent', () => {
  let component: UtenteComponent;
  let fixture: ComponentFixture<UtenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtenteComponent, GestorDeFrotaToolbarComponent],
      imports: [MatToolbarModule, MatIconModule, MatMenuModule]
    });
    fixture = TestBed.createComponent(UtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
