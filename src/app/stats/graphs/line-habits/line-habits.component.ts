import { Component, Input } from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-line-habits',
  templateUrl: './line-habits.component.html',
  styleUrls: ['./line-habits.component.scss']
})
export class LineHabitsComponent {
  @Input() single: any[];
  @Input() yAxisLabel: string;
  view: any[];

  // options
  legend = false;
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
    this.view = [parent.innerWidth * 0.3, (innerWidth * 0.3) * (5 / 7)];
    Object.assign(this, this.single);
  }

  onResize(event) {
    this.view = [event.target.innerWidth * 0.3, (event.target.innerWidth * 0.3) * (5 / 7)];
  }

  parseLabel(label: string) {
    if (!label) {
      return label;
    }

    if (label.includes('12')) {
      return label;
    } else if (/\d/.test(label)) {
      return (parseInt(label.charAt(0), 10) % 3 === 0) ? label : '';
    } else {
      return label;
    }
  }
}
