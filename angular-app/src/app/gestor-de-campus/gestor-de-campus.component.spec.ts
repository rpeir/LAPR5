import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeCampusComponent } from './gestor-de-campus.component';

describe('GestorDeCampusComponent', () => {
  let component: GestorDeCampusComponent;
  let fixture: ComponentFixture<GestorDeCampusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDeCampusComponent]
    });
    fixture = TestBed.createComponent(GestorDeCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
