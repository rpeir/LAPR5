import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Building } from '../building';
import { BuildingService } from '../building.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  buildings: Building[] | undefined;
  building = new Building();
  editForm: FormGroup;

  constructor(private buildingService: BuildingService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      code: [''],
      designation: [''],
      description: [''],
      length: [''],
      width: [''],
      height: [''],
    });
  }

  ngOnInit() {
    this.buildingService.listAllBuilding().subscribe({
      next: data => {
        this.buildings = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }

  updateBuilding() {
    this.buildingService.editBuilding(this.building).subscribe({
      next: data => {
        window.alert(
          'Building updated successfully \n' +
            'Code: ' +
            data.code +
            '\n' +
            'Designation: ' +
            data.designation +
            '\n' +
            'Description: ' +
            data.description +
            '\n' +
            'Length: ' +
            data.length +
            '\n' +
            'Width: ' +
            data.width +
            '\n' +
            'Height: ' +
            data.height +
            '\n',
        );
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }
}
