import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByParameterComponent } from './list-by-parameter.component';

describe('ListByParameterComponent', () => {
  let component: ListByParameterComponent;
  let fixture: ComponentFixture<ListByParameterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListByParameterComponent]
    });
    fixture = TestBed.createComponent(ListByParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
