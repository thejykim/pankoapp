import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { StatsRoutingModule } from './stats-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [StatsPageComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule
  ]
})
export class StatsModule { }
