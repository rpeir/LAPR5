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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { GestorDeFrotaComponent } from './gestor-de-frota/gestor-de-frota.component';
import { GestorDeCampusComponent } from './gestor-de-campus/gestor-de-campus.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { CreateComponent } from './building/create/create.component';
import { EditComponent } from './building/edit/edit.component';
import { ListAllComponent } from './building/list-all/list-all.component';
import { ListMinMaxComponent } from './building/list-min-max/list-min-max.component';
import { ListOfBuildingWithPathwayComponent } from './floor/list-of-building-with-pathway/list-of-building-with-pathway.component';
import { UploadMapComponent } from './floor/upload-map/upload-map.component';
import { ListBetweenBuildingsComponent } from './pathway/list-between-buildings/list-between-buildings.component';
import { ListOfBuildingComponent } from './elevator/list-of-building/list-of-building.component';
import { ListBuildingsServedComponent } from './elevator/list-buildings-served/list-buildings-served.component';
import { DisableComponent } from './robot/disable/disable.component';
import { ListComponent } from './robot/list/list.component';
import { CampusComponent } from './campus/campus.component';
import { PathComponent } from './path/path.component';
import { GetByOptimizationCriteriaComponent } from './path/get-by-optimization-criteria/get-by-optimization-criteria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateRobotComponent } from './robot/create/createRobot.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateFloorComponent } from './floor/create/create-floor.component';
import { FloorListOfBuildingComponent } from './floor/list-of-building/floor-list-of-building.component';
import { MatCardModule } from '@angular/material/card';
import { CreatePathway } from './pathway/create/create-pathway';
import { ElevatorCreateComponent } from './elevator/create/create.component';
import { ElevatorUpdateComponent } from './elevator/update/update.component';
import { GestorDeCampusToolbarComponent } from './gestor-de-campus-toolbar/gestor-de-campus-toolbar.component';
import { ElevatorReplaceComponent } from './elevator/replace/replace.component';
import { CreateComponent as RoomCreateComponent } from './room/create/create.component';
import { BuildingToolBarComponent } from './building/building-tool-bar/building-tool-bar.component';
import { ElevatorToolBarComponent } from './elevator/elevator-tool-bar/elevator-tool-bar.component';
import { FloorToolBarComponent } from './floor/floor-tool-bar/floor-tool-bar.component';
import { PathwayToolBarComponent } from './pathway/pathway-tool-bar/pathway-tool-bar.component';
import { RobotToolBarComponent } from './robot/robot-tool-bar/robot-tool-bar.component';
import { ElevatorListAllComponent } from './elevator/list-all-elevators/listAll.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RoomSidenavComponent } from './room/room-sidenav/room-sidenav.component';
import { GestorDeTarefasComponent } from './gestor-de-tarefas/gestor-de-tarefas.component';
import { EditComponent as PathwayEditComponent } from './pathway/edit/edit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditFloorComponent } from './floor/edit/edit-floor.component';
import { GestorDeFrotaToolbarComponent } from './gestor-de-frota-toolbar/gestor-de-frota-toolbar.component';
import { MatCheckboxModule } from "@angular/material/checkbox";

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
    //MapViewerComponent,
    CreateComponent,
    EditComponent,
    ListAllComponent,
    ListMinMaxComponent,
    ListOfBuildingComponent,
    ListOfBuildingWithPathwayComponent,
    UploadMapComponent,
    ListBetweenBuildingsComponent,
    ListOfBuildingComponent,
    ListBuildingsServedComponent,
    DisableComponent,
    ListComponent,
    CampusComponent,
    PathComponent,
    GetByOptimizationCriteriaComponent,
    CreateRobotComponent,
    CreateFloorComponent,
    FloorListOfBuildingComponent,
    CreatePathway,
    ElevatorCreateComponent,
    ElevatorUpdateComponent,
    GestorDeCampusToolbarComponent,
    ElevatorReplaceComponent,
    RoomCreateComponent,
    BuildingToolBarComponent,
    ElevatorToolBarComponent,
    FloorToolBarComponent,
    PathwayToolBarComponent,
    RobotToolBarComponent,
    ElevatorListAllComponent,
    RoomSidenavComponent,
    GestorDeTarefasComponent,
    ListOfBuildingWithPathwayComponent,
    PathwayEditComponent,
    EditFloorComponent,
    GestorDeFrotaToolbarComponent
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
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
