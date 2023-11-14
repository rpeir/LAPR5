import {Component, OnInit} from '@angular/core';
import {BuildingService} from "../building.service";
import {Building} from "../building";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  constructor(private buildingService:BuildingService) {
  }
code:string|undefined;
designation:string|undefined;
description:string|undefined;
length:number|undefined;
width:number|undefined;
height:number|undefined;
building=new Building();

ngOnInit() {

}
createBuilding(){
  this.buildingService.createBuilding(this.building).subscribe({
    next: (data)=>{
      window.alert("Building created successfully\n"
          + "Code:"+data.code + "\n"
          + "Designation:" + data.designation +"\n"
          + "Description:" + data.description +"\n"
          + "Length:" + data.length+"\n"
          + "Width:" + data.width +"\n"
          + "Height:" + data.height + "\n");
    },
    error: (error) => {
      window.alert(JSON.stringify(error.error.error));
    }
  });
}
}
