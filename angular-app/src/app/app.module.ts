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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
