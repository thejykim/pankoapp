import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsPageComponent } from './stats-page/stats-page.component';


const routes: Routes = [
  { path: '', component: StatsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
