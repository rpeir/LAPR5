import { TestBed } from '@angular/core/testing';
import { RobotTypeComponent } from "./robot-type.component";
import { RobotTypeService } from "./robot-type.service";
import { Location } from '@angular/common';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('RobotTypeComponent', () => {
  let component: RobotTypeComponent;
  let service: RobotTypeService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
    service = TestBed.inject(RobotTypeService);
    component = new RobotTypeComponent(service, location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
