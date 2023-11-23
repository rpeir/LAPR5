import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeTarefasComponent } from './gestor-de-tarefas.component';
import { GetByOptimizationCriteriaComponent } from "../path/get-by-optimization-criteria/get-by-optimization-criteria.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('GestorDeTarefasComponent', () => {
  let component: GestorDeTarefasComponent;
  let fixture: ComponentFixture<GestorDeTarefasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDeTarefasComponent, GetByOptimizationCriteriaComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    // mock GetByOptimizationCriteriaComponent
    TestBed.overrideComponent(GetByOptimizationCriteriaComponent, { set: { template: '<div></div>' } });
    fixture = TestBed.createComponent(GestorDeTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
