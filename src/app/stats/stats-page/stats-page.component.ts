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
    this.hasStats = false;
    this.isLoaded = false;
    this.getUser();
    this.sub = this.statsService.getUserStats().subscribe((userStats) => {
      this.userStats = userStats;
      this.hasStats = !(userStats in window);
      this.isLoaded = true;
    });
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

  isNewAccount() {
    if (this.user) {
      const today = Date.now();
      const registerDate = Date.parse(this.user.metadata.creationTime);
      return ((today - registerDate) < (7 * 1000 * 60 * 60 * 24) );
    }
  }

  hasBasicProperties() {
    return this.userStats.hasOwnProperty('tasksCreated')
    && this.userStats.hasOwnProperty('tasksCompleted')
    && this.userStats.hasOwnProperty('boardsCreated');
  }

  hasHabitProperties() {
    return this.userStats.hasOwnProperty('tasksCreated')
    && this.userStats.hasOwnProperty('tasksCompleted')
    && this.userStats.hasOwnProperty('boardsCreated')
    && this.userStats.hasOwnProperty('creationData')
    && this.userStats.hasOwnProperty('completedTimes');
  }
}
