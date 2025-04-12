import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import {RouterModule, Routes} from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
    {
      path: 'list',
      component: ListComponent,
    },
    {
      path: 'create',
      component: CreateComponent,
     },
    {
      path: 'edit',
      component: EditComponent,
     },
    {
      path: 'edit/:id',
      component: EditComponent,
     },
]
@NgModule({
  declarations: [ListComponent, CreateComponent,EditComponent],
  imports: [
    CommonModule,
      RouterModule.forChild(routes),
      DataTablesModule,
      SharedModule,
      TranslateModule,
  ]

})
export class MesModule { }
