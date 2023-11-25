import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapViewerLazyRoutingModule } from './map-viewer-lazy-routing.module';
import { MapViewerLazyComponent } from './map-viewer-lazy.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    MapViewerLazyComponent
  ],
  imports: [
    CommonModule,
    MapViewerLazyRoutingModule,
    ReactiveFormsModule
  ]
})
export class MapViewerLazyModule { }
