import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorToolBarComponent } from './floor-tool-bar.component';

describe('FloorToolBarComponent', () => {
  let component: FloorToolBarComponent;
  let fixture: ComponentFixture<FloorToolBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorToolBarComponent]
    });
    fixture = TestBed.createComponent(FloorToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
