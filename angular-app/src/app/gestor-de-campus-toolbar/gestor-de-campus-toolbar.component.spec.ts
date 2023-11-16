import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeCampusToolbarComponent } from './gestor-de-campus-toolbar.component';

describe('GestorDeCampusToolbarComponent', () => {
  let component: GestorDeCampusToolbarComponent;
  let fixture: ComponentFixture<GestorDeCampusToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDeCampusToolbarComponent]
    });
    fixture = TestBed.createComponent(GestorDeCampusToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
