import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grouped-vertical',
  templateUrl: './grouped-vertical.component.html',
  styleUrls: ['./grouped-vertical.component.scss']
})
export class GroupedVerticalComponent {
  @Input() multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Tasks created';
  legendTitle: string = 'Sentiment';

  colorScheme = {
    domain: ['#ee7752', '#23a6d5', '#23d5ab']
  };

  constructor() {
    this.view = [parent.innerWidth * 0.35, (innerWidth * 0.35) * (5 / 7)];
    Object.assign(this, this.multi);
  }

  onResize(event) {
    this.view = [event.target.innerWidth * 0.35, (event.target.innerWidth * 0.35) * (5 / 7)];
  }

}
