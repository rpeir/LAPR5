import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Building } from '../../building/building';
import { FloorService } from '../floor.service';
import { BuildingService } from '../../building/building.service';
import { MatSelectChange } from '@angular/material/select';
import { Floor } from '../floor';

@Component({
  selector: 'app-upload-map',
  templateUrl: './upload-map.component.html',
  styleUrls: ['./upload-map.component.css'],
})
export class UploadMapComponent implements OnInit {
  buildings: Building[] = [];
  floors: Floor[] = [];
  floor: Floor = new Floor();
  building: Building = new Building();
  selectedFile: File | null = null;
  fileForm: FormGroup;
  selectedFileContent: any;

  constructor(private floorService: FloorService, private buildingService: BuildingService, private fb: FormBuilder) {
    this.fileForm = this.fb.group({
      building: [''],
      floorNr: [''],
      floorMap: [''],
    });
  }
  ngOnInit() {
    this.buildingService.listAllBuilding().subscribe({
      next: (data: Building[]) => {
        this.buildings = data;
      },
      error: error => {
        window.alert(JSON.stringify(error.error.error));
      },
    });
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const fileContent = JSON.parse(reader.result as string);
          this.selectedFile = { ...file, content: fileContent };
          this.selectedFileContent = fileContent;
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  }

  //TODO check if uploadFile requires event
  uploadFile(): void {
    this.fileForm.setValue({
      building: this.building.domainId,
      floorNr: this.floor.floorNr,
      floorMap: this.selectedFileContent,
    });
    if (this.fileForm.valid) {
      const updatedFloor = this.fileForm.value as Floor;
      console.log('Updated floor:', updatedFloor);
      this.floorService.uploadFloorMap(updatedFloor).subscribe({
        next: (data: Floor) => {
          window.alert(
            'Floor map updated successfully \n' +
              'Building: ' +
              data.building +
              '\n' +
              'Floor number: ' +
              data.floorNr +
              '\n' +
              'Floor map: ' +
              data.floorMap +
              '\n',
          );
        },
        error: (error: any) => {
          window.alert(JSON.stringify(error.error.error));
        },
      });
    }
  }

  onBuildingIdChange(event: MatSelectChange) {
    const selectedId = event.value;
    const selectedBuilding = this.buildings.find(b => b.domainId === selectedId);
    if (selectedBuilding) {
      this.building = { ...selectedBuilding };
      this.floors = [];
      this.floorService.getFloorsOfBuilding(selectedBuilding.designation).subscribe({
        next: (data: Floor[]) => {
          this.floors = data;
        },
        error: (error: any) => {
          window.alert(JSON.stringify(error.error.error));
        },
      });
    } else {
      console.warn(`Building with Id ${selectedId} not found.`);
    }
  }

  onFloorNrChange(event: MatSelectChange) {
    const selectedFloorNr = event.value;
    let selectedFloor;
    for (const f of this.floors) {
      if (f.floorNr === selectedFloorNr) {
        selectedFloor = f;
      }
    }
    if (selectedFloor) {
      this.floor = { ...selectedFloor };
    } else {
      console.warn(`Floor with number ${this.floor.floorNr} not found.`);
    }
  }
}
