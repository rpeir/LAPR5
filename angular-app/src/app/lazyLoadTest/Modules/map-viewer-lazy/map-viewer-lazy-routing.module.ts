import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapViewerLazyComponent } from './map-viewer-lazy.component';

const routes: Routes = [{ path: '', component: MapViewerLazyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapViewerLazyRoutingModule { }
