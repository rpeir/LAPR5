import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RobotToolBarComponent } from './robot-tool-bar.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RobotToolBarComponent', () => {
  let component: RobotToolBarComponent;
  let fixture: ComponentFixture<RobotToolBarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotToolBarComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(RobotToolBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/robots/create" when "Create Robot" option is clicked', () => {
    // Spy on the router navigate method
    const navigateSpy = spyOn(router, 'navigate');

    // Trigger the click event on the "Create Robot" option
    const createRobotOption = fixture.debugElement.query(By.css('#create-robot-option'));
    createRobotOption.triggerEventHandler('click', null);

    // Check if the router navigate method was called with the correct route
    expect(navigateSpy).toHaveBeenCalledWith(['robots/create']);
  });

  it('should navigate to "/robots/list" when "List All Robots" option is clicked', () => {
    // Spy on the router navigate method
    const navigateSpy = spyOn(router, 'navigate');

    // Trigger the click event on the "List Robot" option
    const listRobotOption = fixture.debugElement.query(By.css('#list-all-robots-option'));
    listRobotOption.triggerEventHandler('click', null);

    // Check if the router navigate method was called with the correct route
    expect(navigateSpy).toHaveBeenCalledWith(['robots/list']);
  });

  it('should navigate to "/robots/disable" when "Disable Robot" option is clicked', () => {
    // Spy on the router navigate method
    const navigateSpy = spyOn(router, 'navigate');

    // Trigger the click event on the "List Robot" option
    const listRobotOption = fixture.debugElement.query(By.css('#disable-robot-option'));
    listRobotOption.triggerEventHandler('click', null);

    // Check if the router navigate method was called with the correct route
    expect(navigateSpy).toHaveBeenCalledWith(['robots/disable']);
  });
});
