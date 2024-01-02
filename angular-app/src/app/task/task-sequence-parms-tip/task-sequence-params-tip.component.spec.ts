import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSequenceParamsTipComponent } from './task-sequence-params-tip.component';

describe('TaskSequenceParmsTipComponent', () => {
  let component: TaskSequenceParamsTipComponent;
  let fixture: ComponentFixture<TaskSequenceParamsTipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskSequenceParamsTipComponent]
    });
    fixture = TestBed.createComponent(TaskSequenceParamsTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
