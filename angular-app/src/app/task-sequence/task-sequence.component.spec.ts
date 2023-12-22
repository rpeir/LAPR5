import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSequenceComponent } from './task-sequence.component';

describe('TaskSequenceComponent', () => {
  let component: TaskSequenceComponent;
  let fixture: ComponentFixture<TaskSequenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskSequenceComponent]
    });
    fixture = TestBed.createComponent(TaskSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
