import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss']
})
export class NumberCardComponent implements OnInit {
  @Input() single: any[];

  colorScheme = {
    domain: ['#23d5ab']
  }

  constructor() {
    Object.assign(this, this.single);
  }

  ngOnInit(): void {
  }

}
