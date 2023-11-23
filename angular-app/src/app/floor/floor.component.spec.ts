import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorComponent } from './floor.component';

describe('FloorComponent', () => {
  let component: FloorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorComponent]
    });
    component = new FloorComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
