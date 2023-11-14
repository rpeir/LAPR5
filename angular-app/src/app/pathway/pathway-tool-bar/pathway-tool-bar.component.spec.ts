import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayToolBarComponent } from './pathway-tool-bar.component';

describe('PathwayToolBarComponent', () => {
  let component: PathwayToolBarComponent;
  let fixture: ComponentFixture<PathwayToolBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PathwayToolBarComponent]
    });
    fixture = TestBed.createComponent(PathwayToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
