import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: RoomCreateComponent;
  let fixture: ComponentFixture<RoomCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomCreateComponent]
    });
    fixture = TestBed.createComponent(RoomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
