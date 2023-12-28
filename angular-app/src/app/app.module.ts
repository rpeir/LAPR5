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
import { FloorComponent } from './floor/floor.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
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
import { DisableComponent } from './robot/disable/disable.component';
import { ListComponent } from './robot/list/list.component';
import { PathComponent } from './path/path.component';
import { GetByOptimizationCriteriaComponent } from './path/get-by-optimization-criteria/get-by-optimization-criteria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
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
import { EditComponent as PathwayEditComponent } from './pathway/edit/edit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditFloorComponent } from './floor/edit/edit-floor.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { CreateManagerComponent } from "./user/create-manager/create-manager.component";
import { LoginComponent } from "./auth/login/login.component";
import { CreateUserComponent } from "./user/create-user/create-user.component";
import { RegisterUserComponent } from "./user/register-user/register-user.component";
import { AuthenticationInterceptor } from "./auth/authentication.interceptor";
import { PendingRequestsComponent } from './task/pending-requests/pending-requests.component';
import { TaskSequenceComponent } from './task-sequence/task-sequence.component';
import { SelectRobotComponent } from './task/pending-requests/select-robot/select-robot.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { GetTaskSequenceComponent } from './get-task-sequence/get-task-sequence.component';
import { HomeComponent } from './home/home.component';
import { NgOptimizedImage } from "@angular/common";
import { LogoutComponent } from './auth/logout/logout.component';
import { AccountComponent } from './account/account.component';
import { MatTabsModule } from "@angular/material/tabs";
import { ChangeProfileComponent } from './account/change-profile/change-profile.component';
import { ConsentComponent } from './auth/consent/consent.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

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
    FloorComponent,
    MapViewerComponent,
    CreateComponent,
    EditComponent,
    ListAllComponent,
    ListMinMaxComponent,
    ListOfBuildingWithPathwayComponent,
    UploadMapComponent,
    ListBetweenBuildingsComponent,
    DisableComponent,
    ListComponent,
    PathComponent,
    GetByOptimizationCriteriaComponent,
    CreateRobotComponent,
    CreateFloorComponent,
    FloorListOfBuildingComponent,
    CreatePathway,
    ElevatorCreateComponent,
    ElevatorUpdateComponent,
    RoomCreateComponent,
    BuildingToolBarComponent,
    ElevatorToolBarComponent,
    FloorToolBarComponent,
    PathwayToolBarComponent,
    RobotToolBarComponent,
    ElevatorListAllComponent,
    RoomSidenavComponent,
    ListOfBuildingWithPathwayComponent,
    PathwayEditComponent,
    EditFloorComponent,
    MainToolbarComponent,
    CreateManagerComponent,
    LoginComponent,
    CreateUserComponent,
    RegisterUserComponent,
    PendingRequestsComponent,
    TaskSequenceComponent,
    SelectRobotComponent,
    GetTaskSequenceComponent,
    HomeComponent,
    LogoutComponent,
    AccountComponent,
    ChangeProfileComponent,
    ConsentComponent,
    PrivacyPolicyComponent,
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
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    NgOptimizedImage,
    MatTabsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
