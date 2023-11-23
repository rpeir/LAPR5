import { TestBed } from '@angular/core/testing';
import { PathwayComponent } from "./pathway.component";


describe('PathwayComponent', () => {
  let component: PathwayComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
      .compileComponents();
    component = new PathwayComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
