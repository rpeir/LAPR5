import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRequestsComponent } from './search-requests.component';

describe('SearchRequestsComponent', () => {
  let component: SearchRequestsComponent;
  let fixture: ComponentFixture<SearchRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRequestsComponent]
    });
    fixture = TestBed.createComponent(SearchRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
