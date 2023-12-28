import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentComponent } from './consent.component';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";

describe('ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: ComponentFixture<ConsentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsentComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ],
      imports: [MatDialogModule, MatCheckboxModule, MatIconModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(ConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
