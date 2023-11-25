import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewerLazyComponent } from './map-viewer-lazy.component';

describe('MapVierLazyComponent', () => {
  let component: MapViewerLazyComponent;
  let fixture: ComponentFixture<MapViewerLazyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapViewerLazyComponent]
    });
    fixture = TestBed.createComponent(MapViewerLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
