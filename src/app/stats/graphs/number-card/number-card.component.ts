import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss']
})
export class NumberCardComponent implements OnInit {
  @Input() single: any[];

  view: any[];

  colorScheme = {
    domain: ['#23d5ab', '#23a6d5']
  }

  constructor() {
    this.view = [parent.innerWidth * 0.3, 400];
    Object.assign(this, this.single);
  }

  onResize(event) {
    this.view = [event.target.innerWidth * 0.3, (event.target.innerWidth * 0.3) * (4 / 7)];
  }

  ngOnInit(): void {
  }

}
