import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTaskRequestComponent } from './make-task-request.component';

describe('MakeTaskRequestComponent', () => {
  let component: MakeTaskRequestComponent;
  let fixture: ComponentFixture<MakeTaskRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeTaskRequestComponent]
    });
    fixture = TestBed.createComponent(MakeTaskRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
