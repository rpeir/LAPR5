import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBuldingComponent } from './list-of-bulding.component';

describe('ListOfBuldingComponent', () => {
  let component: ListOfBuldingComponent;
  let fixture: ComponentFixture<ListOfBuldingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfBuldingComponent]
    });
    fixture = TestBed.createComponent(ListOfBuldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
