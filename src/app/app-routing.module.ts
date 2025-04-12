import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
//import {AuthGuard} from "./core/helpers/auth.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'backend/dashboard/central',
    pathMatch: 'full'
  },
  {
    path: 'backend',
    loadChildren: () => import('./backend/backend.module').then(module => module.BackendModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
