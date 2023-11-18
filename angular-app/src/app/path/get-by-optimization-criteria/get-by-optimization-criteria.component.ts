import { Component } from "@angular/core";
import { FloorService } from "../../floor/floor.service";
import { Location } from "@angular/common";
import { BuildingService } from "../../building/building.service";
import { PathwayService } from "../../pathway/pathway.service";
import { Floor } from "../../floor/floor";
import { Building } from "../../building/building";
import { Path } from "../path";
import { PathService } from "../path.service";

@Component({
  selector: "app-get-by-optimization-criteria",
  templateUrl: "./get-by-optimization-criteria.component.html",
  styleUrls: ["./get-by-optimization-criteria.component.css"]
})
export class GetByOptimizationCriteriaComponent {


  constructor(private pathService: PathService,private floorService: FloorService, private location: Location, private buildingService: BuildingService, private pathwayService: PathwayService) {
  }


  floorsSource: Floor[] | undefined;
  floorsDestination: Floor[] | undefined;
  buildings: Building[] | undefined;
  buildingSource: string | undefined;
  buildingDestination: string | undefined;
  floorSource: string | undefined;
  floorDestination: string | undefined;
  optimizationCriteria = ["Less Buildings", "Less Elevator"];
  path: Path | undefined;
  selectedOptimizationCriteria: any;

  getPathBetweenFloors() {
    if (this.selectedOptimizationCriteria == "Less Buildings") {
      this.pathService.getPathBetweenFloorsLessBuildings(this.buildingSource, this.floorSource, this.buildingDestination, this.floorDestination).subscribe({
        next: (data) => {
          this.path = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      });
    }else {
      this.pathService.getPathBetweenFloorsLessElevators(this.buildingSource, this.floorSource, this.buildingDestination, this.floorDestination).subscribe({
        next: (data) => {
          this.path = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      });
      }
    }

  ngOnInit() {
    this.buildingService.getBuildings().subscribe({
        next: (data) => {
          this.buildings = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      }
    );
  }

  listFloorsOfBuildingSource(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe(
      {
        next: (data) => {
          this.floorsSource = data;
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      }
    );
  }

  listFloorsOfBuildingDestination(building: any) {
    this.floorService.getFloorsOfBuilding(building).subscribe({
      next: (data) => {
        this.floorsDestination = data;
      },
      error: (error) => {
        window.alert(error.error.error);
      }
    });
  }

  getFloorInfo(floor: Floor) {
    return floor.description;
  }

  getBuildingInfo(building: Building) {
    return building.description;
  }
}
