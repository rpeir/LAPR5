import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBuldingWithPathwayComponent } from './list-of-bulding-with-pathway.component';

describe('ListOfBuldingWithPathwayComponent', () => {
  let component: ListOfBuldingWithPathwayComponent;
  let fixture: ComponentFixture<ListOfBuldingWithPathwayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfBuldingWithPathwayComponent]
    });
    fixture = TestBed.createComponent(ListOfBuldingWithPathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
