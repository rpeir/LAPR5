import { Component } from '@angular/core';

@Component({
  selector: 'app-map-viewer',
  template: `
    <button (click)="redirectToExternalPage()">Redirect</button>
  `,
})
export class MapViewerComponent {
  redirectToExternalPage() {
    window.location.href = 'http://127.0.0.1:5500/angular-app/src/assets/map-renderer/Thumb_Raiser.html';
  }
}
