import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardCentralComponent} from "./dashboard-central.component";


const routes: Routes = [
  {
    path: '',
    component: DashboardCentralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardCentralRoutingModule { }
