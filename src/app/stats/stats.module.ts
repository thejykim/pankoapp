import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { StatsRoutingModule } from './stats-routing.module';
import { SharedModule } from '../shared/shared.module';

// Material components
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';

// Stats and graphs
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieTasksComponent } from './graphs/pie-tasks/pie-tasks.component';
import { NumberCardComponent } from './graphs/number-card/number-card.component';

@NgModule({
  declarations: [StatsPageComponent, PieTasksComponent, NumberCardComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatChipsModule,
    NgxChartsModule
  ]
})
export class StatsModule { }
