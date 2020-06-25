import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {
  user;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    const currentUser = await this.afAuth.currentUser;
    this.user = currentUser;
  }

  getFirstName() {
    if (this.user) {
      return this.user.displayName.split(' ')[0];
    }
  }

}
