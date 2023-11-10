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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'buildings', component: BuildingComponent },
  { path: 'elevators', component: ElevatorComponent },
  { path: 'floors', component: FloorComponent },
  { path: 'pathways', component: PathwayComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'robots', component: RobotComponent },
  { path: 'robot-types', component: RobotTypeComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'task-types', component: TaskTypeComponent },
  { path: 'gestor-de-frota', component: GestorDeFrotaComponent },
  { path: 'gestor-de-campus', component: GestorDeCampusComponent },
  { path: 'building/create', component: BuildingCreateComponent },
  { path: 'building/edit', component: BuildingEditComponent },
  { path: 'building/list-all', component: BuildingListAllComponent },
  { path: 'building/list-min-max', component: BuildingListMinMaxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
