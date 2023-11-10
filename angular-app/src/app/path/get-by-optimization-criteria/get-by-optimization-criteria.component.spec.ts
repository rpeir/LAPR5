import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByOptimizationCriteriaComponent } from './get-by-optimization-criteria.component';

describe('GetByOptimizationCriteriaComponent', () => {
  let component: GetByOptimizationCriteriaComponent;
  let fixture: ComponentFixture<GetByOptimizationCriteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetByOptimizationCriteriaComponent]
    });
    fixture = TestBed.createComponent(GetByOptimizationCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
