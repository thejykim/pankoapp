import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './user/auth.guard';


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  { path: 'planner', loadChildren: () => import('./kanban/kanban.module').then(m => m.KanbanModule), canActivate: [AuthGuard]},
  { path: 'stats', loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule), canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
