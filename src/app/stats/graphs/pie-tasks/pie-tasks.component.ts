import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pie-tasks',
  templateUrl: './pie-tasks.component.html',
  styleUrls: ['./pie-tasks.component.scss']
})
export class PieTasksComponent {

  @Input() single: any[];

  view: any[];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#23d5ab', '#23a6d5']
  };

  gradient = false;

  margins = [0, 0, 0, 0];

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {
    this.view = [parent.innerWidth * 0.2, parent.innerWidth * 0.2];
    Object.assign(this, this.single);
  }

  onResize(event) {
    this.view = [event.target.innerWidth * 0.2, event.target.innerWidth * 0.2];
  }

}
