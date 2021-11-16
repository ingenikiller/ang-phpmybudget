import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ListecomptesComponent } from './listecomptes/listecomptes.component';
import { ListeoperationsComponent } from './listeoperations/listeoperations.component';
import { PageoperationComponent } from './pageoperation/pageoperation.component';
import { ListefluxComponent } from './listeflux/listeflux.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'listecomptes',
    component: ListecomptesComponent
  },
  {
    path: 'listeoperations',
    component: PageoperationComponent
  },
  {
    path: 'listeflux',
    component: ListefluxComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
