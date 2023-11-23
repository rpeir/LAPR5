import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Building } from '../building';
import { BuildingService } from '../building.service';
import { MatSelectChange } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  buildings: Building[] = [];
  building: Building = new Building();
  editForm: FormGroup;

  constructor(private buildingService: BuildingService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.editForm = this.fb.group({
      code: [''],
      designation: [''],
      description: [''],
      length: [''],
      width: [''],
      height: [''],
    });
  }

  onBuildingCodeChange(event: MatSelectChange) {
    const selectedCode = event.value;
    // Find the building with the selected code
    const selectedBuilding = this.buildings.find(b => b.code === selectedCode);
    // Check if selectedBuilding is not undefined
    if (selectedBuilding) {
      if (this.editForm.dirty) {
        this.editForm.reset();
      }
      // Set the form values
      this.editForm.patchValue({
        code: selectedBuilding.code,
        designation: selectedBuilding.designation,
        description: selectedBuilding.description,
        length: selectedBuilding.length,
        width: selectedBuilding.width,
        height: selectedBuilding.height,
      });
      // Set the building
      this.building = selectedBuilding;
      // Mark the form as dirty
      this.editForm.markAsDirty();
      // Trigger change detection
      this.cdr.detectChanges();
    } else {
      console.warn(`Building with code ${selectedCode} not found.`);
    }
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
    const buildingUpdated = new Building();
    buildingUpdated.code = this.building.code;
    buildingUpdated.designation = this.building.designation;
    buildingUpdated.description = this.building.description;
    buildingUpdated.length = this.building.length;
    buildingUpdated.width = this.building.width;
    buildingUpdated.height = this.building.height;
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
