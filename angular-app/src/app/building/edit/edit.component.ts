import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Building } from '../building';
import { BuildingService } from '../building.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  buildings: Building[] = [];
  building: Building = new Building();
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
  onBuildingCodeChange(event: MatSelectChange) {
    const selectedCode = event.value;
    // Find the building with the selected code
    const selectedBuilding = this.buildings.find((b) => b.code === selectedCode);
    // Check if selectedBuilding is not undefined
    if (selectedBuilding) {
      this.building = { ...selectedBuilding };
      this.editForm.patchValue({
        code: this.building.code,
        designation: this.building.designation,
        description: this.building.description,
        length: this.building.length,
        width: this.building.width,
        height: this.building.height,
      });
    } else {
      console.warn(`Building with code ${selectedCode} not found.`);
    }
  }

  updateBuilding() {
    const buildingUpdated = this.editForm.value;
    this.buildingService.editBuilding(buildingUpdated).subscribe({
      next: data => {
        window.alert(
          'Building updated successfully \n' +
            'Code: ' +
            (data.code ?? buildingUpdated.code) +
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
