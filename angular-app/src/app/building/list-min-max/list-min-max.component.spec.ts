import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMinMaxComponent } from './list-min-max.component';

describe('ListMinMaxComponent', () => {
  let component: ListMinMaxComponent;
  let fixture: ComponentFixture<ListMinMaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMinMaxComponent]
    });
    fixture = TestBed.createComponent(ListMinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
