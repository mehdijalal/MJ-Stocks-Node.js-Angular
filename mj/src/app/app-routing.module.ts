import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { UsersComponent } from './content/components/admin/users/users.component';
import { DashboardsComponent } from './content/components/dashboards/dashboards.component';
import { StocksComponent } from './content/components/stocks/stocks.component';


const routes: Routes = [
  {
    path:'',component:DashboardsComponent
  },
  {
    path:'dashboard',component:DashboardsComponent
  },
  {
    path:'stocks',component:StocksComponent
  },
  {
    path:'users',component:UsersComponent
  },
  {
    path:'tasks',
    loadChildren:()=>import('./content/content.module').then(m=>m.ContentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
