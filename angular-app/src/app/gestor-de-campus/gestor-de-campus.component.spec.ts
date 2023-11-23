import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeCampusComponent } from './gestor-de-campus.component';

describe('GestorDeCampusComponent', () => {
  let component: GestorDeCampusComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDeCampusComponent]
    });
    component = new GestorDeCampusComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
