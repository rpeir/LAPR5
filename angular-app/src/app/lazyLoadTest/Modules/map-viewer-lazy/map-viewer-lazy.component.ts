import { Component, OnInit } from "@angular/core";
// @ts-ignore
import start from './map-viewer.js';

@Component({
  selector: 'app-map-vier-lazy',
  templateUrl: './map-viewer-lazy.component.html',
  styleUrls: ['./map-viewer-lazy.component.css']
})
export class MapViewerLazyComponent implements OnInit{

  ngOnInit(): void {
    start();
  }


}
