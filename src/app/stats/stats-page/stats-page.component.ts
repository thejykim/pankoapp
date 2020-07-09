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
  perDayStats: any[];
  perWeekStats: any[];
  creationType: string;
  completionType: string;

  constructor(public afAuth: AngularFireAuth, public statsService: StatsService) { }

  ngOnInit(): void {
    this.hasStats = false;
    this.isLoaded = false;
    this.getUser();
    this.sub = this.statsService.getUserStats().subscribe((userStats) => {
      this.userStats = userStats;
      this.hasStats = !(userStats in window);
      this.fillStats();
      this.categorizeHabits();
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
    if (this.hasStats) {
      // Basic stats
      this.taskStats = [
        {
          name: 'Complete',
          value: this.userStats.tasksCompleted
        },
        {
          name: 'Incomplete',
          value: this.userStats.tasksCreated - this.userStats.tasksCompleted
        }
      ];

      const cardBoardRatio = Math.round(this.userStats.tasksCreated / this.userStats.boardsCreated);
      this.boardStats = [
        {
          name: this.userStats.tasksCreated === 1 ? 'task created' : 'tasks created',
          value: this.userStats.tasksCreated
        },
        {
          name: cardBoardRatio === 1 ? 'card per board' : 'cards per board',
          value: cardBoardRatio
        }
      ];

      // Habits
      if (!this.isNewAccount()) {
        this.perDayStats = [];
        this.perWeekStats = [];

        this.generateDataArray(this.perDayStats, 'Tasks created', 'hours');
        this.generateDataArray(this.perDayStats, 'Tasks completed', 'hours');

        this.generateDataArray(this.perWeekStats, 'Tasks created', 'days');
        this.generateDataArray(this.perWeekStats, 'Tasks completed', 'days');

        this.userStats.creationTimes.forEach(time => {
          const date = new Date(time);
          this.perDayStats[0].series[date.getHours()].value++;
          this.perWeekStats[0].series[date.getDay()].value++;
        });

        this.userStats.completedTimes.forEach(time => {
          const date = new Date(time);
          this.perDayStats[1].series[date.getHours()].value++;
          this.perWeekStats[1].series[date.getDay()].value++;
        });

      }
    }
  }

  taskCompletedComment() {
    if (this.isLoaded && this.hasStats) {
      const percent = Math.round(100 * (this.userStats.tasksCompleted / this.userStats.tasksCreated));
      return percent > 50 ? `You've finished ${percent}% of your tasks here. Nice going!`
      : `You've finished ${percent}% of your tasks here. You've probably just delegated yourself a new load of tasks - best of luck!`;
    }
  }

  generateDataArray(result: any[], title: string, type: string) {
    const data = {
      name: title,
      series: []
    };

    if (type === 'hours') {
      let hour = 12;
      let isAM = false;

      while (!(hour === 11 && !isAM)) {
        if (hour === 0) {
          hour++;
          continue;
        }

        data.series.push({
          name: hour + (isAM ? 'AM' : 'PM'),
          value: 0
        });

        if (hour === 12) {
          isAM = !isAM;
          hour = 1;
        } else {
          hour++;
        }
      }

      // add in the last hour
      data.series.push({
        name: '11PM',
        value: 0
      });

    } else if (type === 'days') {
      // days of the week
      const weekday = new Array(7);
      weekday[0] = 'Mon';
      weekday[1] = 'Tue';
      weekday[2] = 'Wed';
      weekday[3] = 'Thu';
      weekday[4] = 'Fri';
      weekday[5] = 'Sat';
      weekday[6] = 'Sun';

      for (let i = 0; i < 7; i++) {
        data.series.push({
          name: weekday[i],
          value: 0
        });
      }
    }

    result.push(data);
  }

  categorizeHabits() {
    if (this.hasStats && !this.isNewAccount()) {
      const createdPerSection = [0, 0, 0];
      const completedPerSection = [0, 0, 0];

      // categorize by day
      for (let i = 0; i < 24; i++) {
        if (i < 3 || i > 20) {
          // night
          createdPerSection[2] += this.perDayStats[0].series[i].value;
          completedPerSection[2] += this.perDayStats[1].series[i].value;
        } else if (i > 3 && i < 13) {
          // morning
          createdPerSection[0] += this.perDayStats[0].series[i].value;
          completedPerSection[0] += this.perDayStats[1].series[i].value;
        } else {
          // afternoon
          createdPerSection[1] += this.perDayStats[0].series[i].value;
          completedPerSection[1] += this.perDayStats[1].series[i].value;
        }
      }

      // categorize
      if (createdPerSection[0] > createdPerSection[1] && createdPerSection[0] > createdPerSection[2]) {
        this.creationType = 'morning';
      } else if (createdPerSection[1] > createdPerSection[0] && createdPerSection[1] > createdPerSection[2]) {
        this.creationType = 'afternoon';
      } else {
        this.creationType = 'evening';
      }

      if (completedPerSection[0] > completedPerSection[1] && completedPerSection[0] > completedPerSection[2]) {
        this.completionType = 'morning';
      } else if (completedPerSection[1] > completedPerSection[0] && completedPerSection[1] > completedPerSection[2]) {
        this.completionType = 'afternoon';
      } else {
        this.completionType = 'evening';
      }
    }
  }

}
