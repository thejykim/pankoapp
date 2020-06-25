import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { StatsService } from '../stats.service';
import { UserStats } from '../user-stats.model';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {
  user;
  userStats: UserStats;
  sub: Subscription;
  isLoaded: boolean;
  hasStats: boolean;

  constructor(public afAuth: AngularFireAuth, public statsService: StatsService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.getUser();
    this.sub = this.statsService.getUserStats().subscribe((userStats) => (this.isLoaded = true,
      this.userStats = userStats,
      this.hasStats = (userStats !== [])));
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
