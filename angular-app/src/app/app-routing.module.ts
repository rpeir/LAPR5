import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuildingComponent } from "./building/building.component";
import { ElevatorComponent } from "./elevator/elevator.component";
import { FloorComponent } from "./floor/floor.component";
import { PathwayComponent } from "./pathway/pathway.component";
import { RoomComponent } from "./room/room.component";
import { RobotComponent } from "./robot/robot.component";
import { RobotTypeComponent } from "./robot-type/robot-type.component";
import { TaskComponent } from "./task/task.component";
import { CreateComponent as BuildingCreateComponent } from "./building/create/create.component";
import { EditComponent as BuildingEditComponent } from "./building/edit/edit.component";
import { ListAllComponent as BuildingListAllComponent } from "./building/list-all/list-all.component";
import { ListMinMaxComponent as BuildingListMinMaxComponent } from "./building/list-min-max/list-min-max.component";
import { CreateRobotComponent } from "./robot/create/createRobot.component";
import { CreateFloorComponent } from "./floor/create/create-floor.component";
import { FloorListOfBuildingComponent } from "./floor/list-of-building/floor-list-of-building.component";
import { CreatePathway } from "./pathway/create/create-pathway";
import { MapViewerComponent } from "./map-viewer/map-viewer.component";
import { ElevatorCreateComponent } from "./elevator/create/create.component";
import { ElevatorUpdateComponent } from "./elevator/update/update.component";
import { CreateComponent as RoomCreateComponent } from "./room/create/create.component";
import { DisableComponent } from "./robot/disable/disable.component";
import { ListComponent as ListRobotComponent } from "./robot/list/list.component";
import { ElevatorListAllComponent } from "./elevator/list-all-elevators/listAll.component";
import { ListOfBuildingWithPathwayComponent } from "./floor/list-of-building-with-pathway/list-of-building-with-pathway.component";
import { EditComponent as PathwayEditComponent } from "./pathway/edit/edit.component";
import { ListBetweenBuildingsComponent } from "./pathway/list-between-buildings/list-between-buildings.component";
import { EditFloorComponent } from "./floor/edit/edit-floor.component";
import { UploadMapComponent } from "./floor/upload-map/upload-map.component";
import { GetByOptimizationCriteriaComponent } from "./path/get-by-optimization-criteria/get-by-optimization-criteria.component";
import { CreateManagerComponent } from "./user/create-manager/create-manager.component";
import { LoginComponent } from "./auth/login/login.component";
import { CreateUserComponent } from "./user/create-user/create-user.component";
import { RegisterUserComponent } from "./user/register-user/register-user.component";
import { VerifyAuthService } from "./auth/verify-auth.service";
import { PendingRequestsComponent } from "./task/pending-requests/pending-requests.component";
import { TaskSequenceComponent } from "./task-sequence/task-sequence.component";
import { GetTaskSequenceComponent } from "./get-task-sequence/get-task-sequence.component";
import {HomeComponent} from "./home/home.component";
import {LogoutComponent} from "./auth/logout/logout.component";
import {
  adminGuard,
  campusManagerGuard,
  fleetManagerGuard,
  taskManagerGuard,
  userGuard
} from "./auth/autorization.guard";
import {AccountComponent} from "./account/account.component";
import {ChangeProfileComponent} from "./account/change-profile/change-profile.component";
import {CopyDataComponent} from "./account/copy-data/copy-data.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {DeleteAccountComponent} from "./account/delete-account/delete-account.component";


const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [VerifyAuthService] },
  { path: "buildings", component: BuildingComponent, canActivate: [campusManagerGuard] },
  { path: "elevators", component: ElevatorComponent, canActivate: [campusManagerGuard] },
  { path: "floors", component: FloorComponent, canActivate: [campusManagerGuard] },
  { path: "floors/create", component: CreateFloorComponent, canActivate: [campusManagerGuard] },
  { path: "floors/building", component: FloorListOfBuildingComponent, canActivate: [campusManagerGuard] },
  { path: "floors/building-pathways", component: ListOfBuildingWithPathwayComponent, canActivate: [campusManagerGuard] },
  { path: "floors/edit", component: EditFloorComponent, canActivate: [campusManagerGuard]},
  { path: "pathways", component: PathwayComponent, canActivate: [campusManagerGuard] },
  { path: "pathways/create", component: CreatePathway, canActivate: [campusManagerGuard] },
  { path: "pathways/edit", component: PathwayEditComponent, canActivate: [campusManagerGuard] },
  { path: "pathways/list-between-buildings", component: ListBetweenBuildingsComponent, canActivate: [campusManagerGuard] },
  { path: "rooms", component: RoomComponent, canActivate: [campusManagerGuard] },
  { path: "robots", component: RobotComponent, canActivate: [fleetManagerGuard] },
  { path: "robots/create", component: CreateRobotComponent, canActivate: [fleetManagerGuard] },
  { path: "robots/disable", component: DisableComponent, canActivate: [fleetManagerGuard] },
  { path: "robots/list", component: ListRobotComponent, canActivate: [fleetManagerGuard] },
  { path: "robotTypes", component: RobotTypeComponent, canActivate: [fleetManagerGuard] },
  { path: "tasks", component: TaskComponent, canActivate: [taskManagerGuard] },
  { path: "building/create", component: BuildingCreateComponent, canActivate: [campusManagerGuard] },
  { path: "building/edit", component: BuildingEditComponent, canActivate: [campusManagerGuard] },
  { path: "building/list-all", component: BuildingListAllComponent, canActivate: [campusManagerGuard] },
  { path: "building/list-min-max", component: BuildingListMinMaxComponent, canActivate: [campusManagerGuard] },
  { path: "elevator/create", component: ElevatorCreateComponent, canActivate: [campusManagerGuard] },
  { path: "elevator/update", component: ElevatorUpdateComponent, canActivate: [campusManagerGuard] },
  { path: "map-viewer", component: MapViewerComponent, canActivate: [userGuard] },
  { path: "rooms/create", component: RoomCreateComponent, canActivate: [campusManagerGuard] },
  { path: "elevator/list-all-elevators", component: ElevatorListAllComponent , canActivate: [campusManagerGuard]},
  { path: "floors/upload-map", component: UploadMapComponent, canActivate: [campusManagerGuard] },
  //{ path: 'map-viewer', loadChildren: () => import('./lazyLoadTest/Modules/map-viewer-lazy/map-viewer-lazy.module').then(m => m.MapViewerLazyModule) },
  { path: 'path/optimization-criteria', component: GetByOptimizationCriteriaComponent, canActivate: [taskManagerGuard]},
  { path: 'system-administrator/create-manager', component: CreateManagerComponent, canActivate: [adminGuard]},
  { path: 'login',component: LoginComponent},
  { path: 'signup',component:CreateUserComponent },
  { path: 'system-administrator/register-user',component:RegisterUserComponent, canActivate: [adminGuard]},
  { path: 'tasks/pending', component: PendingRequestsComponent, canActivate: [taskManagerGuard] },
  { path: "tasks/sequence", component: TaskSequenceComponent , canActivate: [taskManagerGuard]},
  { path: "tasks/startSequence", component: GetTaskSequenceComponent , canActivate: [taskManagerGuard]},
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [VerifyAuthService]
})
export class AppRoutingModule {
}
