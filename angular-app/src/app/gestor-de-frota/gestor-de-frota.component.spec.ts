import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeFrotaComponent } from './gestor-de-frota.component';

describe('GestorDeFrotaComponent', () => {
  let component: GestorDeFrotaComponent;
  let fixture: ComponentFixture<GestorDeFrotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDeFrotaComponent]
    });
    fixture = TestBed.createComponent(GestorDeFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
