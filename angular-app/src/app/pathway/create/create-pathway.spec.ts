import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePathway } from './create-pathway';

describe('CreateComponent', () => {
  let component: CreatePathway;
  let fixture: ComponentFixture<CreatePathway>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePathway]
    });
    fixture = TestBed.createComponent(CreatePathway);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
