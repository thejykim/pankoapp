import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-habits-card',
  templateUrl: './habits-card.component.html',
  styleUrls: ['./habits-card.component.scss']
})
export class HabitsCardComponent {
  @Input() habitsArray: any[];

  constructor(public afAuth: AngularFireAuth) { }

}
