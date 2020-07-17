import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss']
})
export class NumberCardComponent {
  @Input() single: any[];

  view: any[];

  colorScheme = {
    domain: ['#23d5ab', '#23a6d5']
  };

  constructor() {
    this.view = [parent.innerWidth * 0.35, (parent.innerWidth * 0.35) * (4 / 7)];
    Object.assign(this, this.single);
  }

  onResize(event) {
    this.view = [event.target.innerWidth * 0.35, (event.target.innerWidth * 0.35) * (4 / 7)];
  }

}
