import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingComponent } from './building/building.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { FloorComponent } from './floor/floor.component';
import { PathwayComponent } from './pathway/pathway.component';
import { RoomComponent } from './room/room.component';
import { RobotComponent } from './robot/robot.component';
import { RobotTypeComponent } from './robot-type/robot-type.component';
import { TaskTypeComponent } from './task-type/task-type.component';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';
import { GestorDeFrotaComponent } from './gestor-de-frota/gestor-de-frota.component';
import { GestorDeCampusComponent } from './gestor-de-campus/gestor-de-campus.component';
import { CreateComponent as BuildingCreateComponent } from './building/create/create.component';
import { EditComponent as BuildingEditComponent } from './building/edit/edit.component';
import { ListAllComponent as BuildingListAllComponent } from './building/list-all/list-all.component';
import { ListMinMaxComponent as BuildingListMinMaxComponent } from './building/list-min-max/list-min-max.component';
import { CreateRobotComponent } from './robot/create/createRobot.component';
import { CreateFloorComponent } from './floor/create/create-floor.component';
import { FloorListOfBuildingComponent } from './floor/list-of-building/floor-list-of-building.component';
import { CreatePathway } from './pathway/create/create-pathway';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { ElevatorCreateComponent } from './elevator/create/create.component';
import { ElevatorUpdateComponent } from './elevator/update/update.component';
import { CreateComponent as RoomCreateComponent } from './room/create/create.component';
import { DisableComponent } from './robot/disable/disable.component';
import { ListComponent as ListRobotComponent } from './robot/list/list.component';
import { ElevatorListAllComponent } from './elevator/list-all-elevators/listAll.component';
import { GestorDeTarefasComponent } from './gestor-de-tarefas/gestor-de-tarefas.component';
import { ListOfBuildingWithPathwayComponent } from './floor/list-of-building-with-pathway/list-of-building-with-pathway.component';
import { EditComponent as PathwayEditComponent } from './pathway/edit/edit.component';
import { ListBetweenBuildingsComponent } from './pathway/list-between-buildings/list-between-buildings.component';
import { EditFloorComponent } from './floor/edit/edit-floor.component';
import { UploadMapComponent } from './floor/upload-map/upload-map.component';
import {
  GetByOptimizationCriteriaComponent
} from "./path/get-by-optimization-criteria/get-by-optimization-criteria.component";
import { AdministradorDeSistemaComponent } from './administrador-de-sistema/administrador-de-sistema.component';
import {CreateManagerComponent} from "./user/create-manager/create-manager.component";
import {UtenteComponent} from "./utente/utente.component";
import {CreateUserComponent}from "./user/create-user/create-user.component"
import {RegisterUserComponent} from "./user/register-user/register-user.component";
import { VerifyAuthService } from "./auth/verify-auth.service";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'buildings', component: BuildingComponent },
  { path: 'elevators', component: ElevatorComponent },
  { path: 'floors', component: FloorComponent, canActivate: [VerifyAuthService] },
  { path: 'floors/create', component: CreateFloorComponent },
  { path: 'floors/building', component: FloorListOfBuildingComponent },
  { path: 'floors/building-pathways', component: ListOfBuildingWithPathwayComponent },
  { path: 'floors/edit', component: EditFloorComponent },
  { path: 'pathways', component: PathwayComponent },
  { path: 'pathways/create', component: CreatePathway },
  { path: 'pathways/edit', component: PathwayEditComponent },
  { path: 'pathways/list-between-buildings', component: ListBetweenBuildingsComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'robots', component: RobotComponent },
  { path: 'robots/create', component: CreateRobotComponent },
  { path: 'robots/disable', component: DisableComponent },
  { path: 'robots/list', component: ListRobotComponent },
  { path: 'robotTypes', component: RobotTypeComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'task-types', component: TaskTypeComponent },
  { path: 'fleet-manager', component: GestorDeFrotaComponent },
  { path: 'campus-manager', component: GestorDeCampusComponent },
  { path: 'task-manager', component: GestorDeTarefasComponent },
  { path: 'building/create', component: BuildingCreateComponent },
  { path: 'building/edit', component: BuildingEditComponent },
  { path: 'building/list-all', component: BuildingListAllComponent },
  { path: 'building/list-min-max', component: BuildingListMinMaxComponent },
  { path: 'elevator/create', component: ElevatorCreateComponent },
  { path: 'elevator/update', component: ElevatorUpdateComponent },
  { path: 'map-viewer', component: MapViewerComponent },
  { path: 'rooms/create', component: RoomCreateComponent },
  { path: 'elevator/list-all-elevators', component: ElevatorListAllComponent },
  { path: 'floors/upload-map', component: UploadMapComponent },
  //{ path: 'map-viewer', loadChildren: () => import('./lazyLoadTest/Modules/map-viewer-lazy/map-viewer-lazy.module').then(m => m.MapViewerLazyModule) },
  { path: 'path/optimization-criteria', component: GetByOptimizationCriteriaComponent},
  { path: 'system-administrator', component: AdministradorDeSistemaComponent},
  {path: 'system-administrator/create-manager', component: CreateManagerComponent},
  {path: 'utente',component: UtenteComponent},
  {path:'user/create-user',component:CreateUserComponent},
  {path: 'system-administrator/register-user',component:RegisterUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [VerifyAuthService]
})
export class AppRoutingModule {}
