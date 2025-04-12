import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import {DashboardCentralComponent} from "./dashboard-central.component";
import {DashboardCentralRoutingModule} from "./dashboard-central-routing.module";
import { Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: DashboardCentralComponent
  }
];

@NgModule({
  declarations: [
    DashboardCentralComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DashboardCentralRoutingModule
  ]
})
export class DashboardCentralModule { }
