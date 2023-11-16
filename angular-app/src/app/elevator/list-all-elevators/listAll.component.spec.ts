import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ElevatorCreateComponent} from "../create/create.component";
import {ElevatorListAllComponent} from "./listAll.component";

describe('ElevatorListAll', () => {
  let component: ElevatorListAllComponent;
  let fixture: ComponentFixture<ElevatorListAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorListAllComponent]
    });
    fixture = TestBed.createComponent(ElevatorListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should list', () => {
    expect(component).toBeTruthy();
  });
});
