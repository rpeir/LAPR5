import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathComponent } from './path.component';

describe('PathComponent', () => {
  let component: PathComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PathComponent]
    });
    component = new PathComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
