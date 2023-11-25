import { Component } from '@angular/core';
import { BuildingService } from '../building.service';
import { Building } from '../building';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css'],
})
export class ListAllComponent {
  constructor(private createBuildingService: BuildingService) {}

  buildings: Building[] | any;

  ngOnInit(): void {
    this.getBuildings();
  }

  getBuildings() {
    this.createBuildingService.listAllBuilding().subscribe({
      next: data => {
        this.buildings = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }
}
