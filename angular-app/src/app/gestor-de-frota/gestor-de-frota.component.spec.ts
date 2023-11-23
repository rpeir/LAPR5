import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeFrotaComponent } from './gestor-de-frota.component';
import { GestorDeFrotaToolbarComponent } from "../gestor-de-frota-toolbar/gestor-de-frota-toolbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

describe('GestorDeFrotaComponent', () => {
  let component: GestorDeFrotaComponent;
  let fixture: ComponentFixture<GestorDeFrotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDeFrotaComponent, GestorDeFrotaToolbarComponent],
      imports: [MatToolbarModule, MatIconModule, MatMenuModule]
    });
    fixture = TestBed.createComponent(GestorDeFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
