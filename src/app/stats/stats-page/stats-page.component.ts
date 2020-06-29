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
  taskStats: any[];
  boardStats: any[];

  constructor(public afAuth: AngularFireAuth, public statsService: StatsService) { }

  ngOnInit(): void {
    this.hasStats = false;
    this.isLoaded = false;
    this.getUser();
    this.sub = this.statsService.getUserStats().subscribe((userStats) => {
      this.userStats = userStats;
      this.hasStats = !(userStats in window);
      this.fillStats();
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

  fillStats() {
    this.taskStats = [
      {
        name: 'Completed',
        value: this.userStats.tasksCompleted
      },
      {
        name: 'Uncompleted',
        value: this.userStats.tasksCreated - this.userStats.tasksCompleted
      }
    ];

    const cardBoardRatio = Math.round(this.userStats.tasksCreated / this.userStats.boardsCreated);
    this.boardStats = [
      {
        name: cardBoardRatio === 1 ? 'card per board' : 'cards per board',
        value: cardBoardRatio
      }
    ];
  }

  taskCompletedComment() {
    if (this.isLoaded) {
      const percent = Math.round(100 * (this.userStats.tasksCompleted / this.userStats.tasksCreated));
      return percent > 50 ? `You've finished ${percent}% of your tasks here. Nice going!`
      : `You've finished ${percent}% of your tasks here. You've probably just delegated yourself a new load of tasks - best of luck!`;
    }
  }

}
