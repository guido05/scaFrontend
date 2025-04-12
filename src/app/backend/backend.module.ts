import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardModule} from './dashboard/dashboard.module';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from '../theme/layout/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/analytics',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'asociado',
        loadChildren: () => import('./asociado/asociado.module').then(module => module.AsociadoModule)
      },
      {
        path: 'mes',
        loadChildren: () => import('./mes/mes.module').then(module => module.MesModule)
      },
      {
        path: 'dia',
        loadChildren: () => import('./dia/dia.module').then(module => module.DiaModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(module => module.CategoriaModule)
      },
      {
        path: 'condicion',
        loadChildren: () => import('./condicion/condicion.module').then(module => module.CondicionModule)
      },
      {
        path: 'asociadoCondicion',
        loadChildren: () => import('./asociadoCondicion/asociadoCondicion.module').then(module => module.AsociadoCondicionModule)
      },
      {
        path: 'sueldoBasico',
        loadChildren: () => import('./sueldoBasico/sueldoBasico.module').then(module => module.SueldoBasicoModule)
      },
      {
        path: 'porcentajeMes',
        loadChildren: () => import('./porcentajeMes/porcentajeMes.module').then(module => module.PorcentajeMesModule)
      },
      {
        path: 'firma',
        loadChildren: () => import('./firma/firma.module').then(module => module.FirmaModule)
      },
      {
        path: 'asistencia',
        loadChildren: () => import('./asistencia/asistencia.module').then(module => module.AsistenciaModule)
      },
      {
        path: 'asistenciaTotal',
        loadChildren: () => import('./asistenciaTotal/asistenciaTotal.module').then(module => module.AsistenciaTotalModule)
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BackendModule { }
