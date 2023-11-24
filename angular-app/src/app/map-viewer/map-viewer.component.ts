import { Component, OnInit } from "@angular/core";
// @ts-ignore
import start from './map-viewer.js';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css']
})
export class MapViewerComponent implements OnInit {

  ngOnInit(): void {
    start();
  }


}
