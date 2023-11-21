import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeFrotaToolbarComponent } from './gestor-de-frota-toolbar.component';

describe('GestorDeFrotaToolbarComponent', () => {
  let component: GestorDeFrotaToolbarComponent;
  let fixture: ComponentFixture<GestorDeFrotaToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDeFrotaToolbarComponent]
    });
    fixture = TestBed.createComponent(GestorDeFrotaToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
