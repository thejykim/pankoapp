import { Component, Input } from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-standard-line',
  templateUrl: './standard-line.component.html',
  styleUrls: ['./standard-line.component.scss']
})
export class StandardLineComponent {
  @Input() single: any[];
  @Input() yAxisLabel: string;
  view: any[];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showGridLines = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  timeline = true;
  curve = shape.curveMonotoneX;

  colorScheme = {
    domain: ['#23d5ab', '#23a6d5']
  };

  constructor() {
    this.view = [parent.innerWidth * 0.35, (innerWidth * 0.35) * (5 / 7)];
    Object.assign(this, this.single);
  }

  onResize(event) {
    this.view = [event.target.innerWidth * 0.35, (event.target.innerWidth * 0.35) * (5 / 7)];
  }

  performanceComment(model: any) {
    if (model[1].value !== 0) {
      const percent = Math.round(100 * ((model[0].value - model[1].value) / model[1].value));
      return percent > 0 ? `${percent}% increase`
      : `${percent}% decrease`;
    } else {
      return `+${model[0].value} increase`;
    }
  }
}
