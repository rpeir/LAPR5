import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeTarefasComponent } from './gestor-de-tarefas.component';

describe('GestorDeTarefasComponent', () => {
  let component: GestorDeTarefasComponent;
  let fixture: ComponentFixture<GestorDeTarefasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDeTarefasComponent]
    });
    fixture = TestBed.createComponent(GestorDeTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
