import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advanced-pie',
  templateUrl: './advanced-pie.component.html',
  styleUrls: ['./advanced-pie.component.scss']
})
export class AdvancedPieComponent {

  @Input() single: any[];

  view: any[];

  // options
  colorScheme = {
    domain: ['#23d5ab', '#23a6d5']
  };

  gradient = false;

  constructor() {
    this.view = [700, 400];
    Object.assign(this, this.single);
  }

  onResize(event) {
    this.view = [event.target.innerWidth * 0.35, (event.target.innerWidth * 0.35) * (5 / 7)];
  }

}
