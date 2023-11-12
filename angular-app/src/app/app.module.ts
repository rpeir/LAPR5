import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildingComponent } from './building/building.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { PathwayComponent } from './pathway/pathway.component';
import { RoomComponent } from './room/room.component';
import { RobotComponent } from './robot/robot.component';
import { RobotTypeComponent } from './robot-type/robot-type.component';
import { TaskComponent } from './task/task.component';
import { TaskTypeComponent } from './task-type/task-type.component';
import { FloorComponent } from './floor/floor.component';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { GestorDeFrotaComponent } from './gestor-de-frota/gestor-de-frota.component';
import { GestorDeCampusComponent } from './gestor-de-campus/gestor-de-campus.component';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { CreateComponent } from './building/create/create.component';
import { EditComponent } from './building/edit/edit.component';
import { ListAllComponent } from './building/list-all/list-all.component';
import { ListMinMaxComponent } from './building/list-min-max/list-min-max.component';
import { ListOfBuldingWithPathwayComponent } from './floor/list-of-bulding-with-pathway/list-of-bulding-with-pathway.component';
import { UploadMapComponent } from './floor/upload-map/upload-map.component';
import { ListBetweenBuildingsComponent } from './pathway/list-between-buildings/list-between-buildings.component';
import { ListOfBuildingComponent } from './elevator/list-of-building/list-of-building.component';
import { ListBuildingsServedComponent } from './elevator/list-buildings-served/list-buildings-served.component';
import { DisableComponent } from './robot/disable/disable.component';
import { ListComponent } from './robot/list/list.component';
import { ListByParameterComponent } from './robot/list-by-parameter/list-by-parameter.component';
import { CampusComponent } from './campus/campus.component';
import { PathComponent } from './path/path.component';
import { GetByOptimizationCriteriaComponent } from './path/get-by-optimization-criteria/get-by-optimization-criteria.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CreateRobotComponent} from "./robot/create/createRobot.component";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CreateFloorComponent } from "./floor/create/create-floor.component";
import { FloorListOfBuildingComponent } from "./floor/list-of-building/floor-list-of-building.component";
import { MatCardModule } from "@angular/material/card";
import { CreatePathway } from "./pathway/create/create-pathway";

@NgModule({
  declarations: [
    AppComponent,
    BuildingComponent,
    ElevatorComponent,
    PathwayComponent,
    RoomComponent,
    RobotComponent,
    RobotTypeComponent,
    TaskComponent,
    TaskTypeComponent,
    FloorComponent,
    LoginComponent,
    GestorDeFrotaComponent,
    GestorDeCampusComponent,
    MapViewerComponent,
    CreateComponent,
    EditComponent,
    ListAllComponent,
    ListMinMaxComponent,
    ListOfBuildingComponent,
    ListOfBuldingWithPathwayComponent,
    UploadMapComponent,
    ListBetweenBuildingsComponent,
    ListOfBuildingComponent,
    ListBuildingsServedComponent,
    DisableComponent,
    ListComponent,
    ListByParameterComponent,
    CampusComponent,
    PathComponent,
    GetByOptimizationCriteriaComponent,
    CreateRobotComponent,
    CreateFloorComponent,
    FloorListOfBuildingComponent,
    CreatePathway
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
