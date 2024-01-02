import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTaskSequenceComponent } from './get-task-sequence.component';

describe('GetTaskSequenceComponent', () => {
  let component: GetTaskSequenceComponent;
  let fixture: ComponentFixture<GetTaskSequenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetTaskSequenceComponent]
    });
    fixture = TestBed.createComponent(GetTaskSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
