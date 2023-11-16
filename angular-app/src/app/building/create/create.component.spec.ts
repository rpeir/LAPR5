import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComponent]
    });
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the createBuilding method when the form is submitted', () => {
    spyOn(component, 'createBuilding');

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();

    expect(component.createBuilding).toHaveBeenCalled();
  });
});
