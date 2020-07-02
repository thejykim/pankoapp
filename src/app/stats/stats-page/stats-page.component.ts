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
    if (this.hasStats && !this.isNewAccount()) {
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

      this.perDayStats = [
        {
          name: 'Tasks created',
          series: [
            {
              name: '12AM',
              value: 0
            },
            {
              name: '1AM',
              value: 0
            },
            {
              name: '2AM',
              value: 0
            },
            {
              name: '3AM',
              value: 0
            },
            {
              name: '4AM',
              value: 0
            },
            {
              name: '5AM',
              value: 0
            },
            {
              name: '6AM',
              value: 0
            },
            {
              name: '7AM',
              value: 0
            },
            {
              name: '8AM',
              value: 0
            },
            {
              name: '9AM',
              value: 0
            },
            {
              name: '10AM',
              value: 0
            },
            {
              name: '11AM',
              value: 0
            },
            {
              name: '12PM',
              value: 0
            },
            {
              name: '1PM',
              value: 0
            },
            {
              name: '2PM',
              value: 0
            },
            {
              name: '3PM',
              value: 0
            },
            {
              name: '4PM',
              value: 0
            },
            {
              name: '5PM',
              value: 0
            },
            {
              name: '6PM',
              value: 0
            },
            {
              name: '7PM',
              value: 0
            },
            {
              name: '8PM',
              value: 0
            },
            {
              name: '9PM',
              value: 0
            },
            {
              name: '10PM',
              value: 0
            },
            {
              name: '11PM',
              value: 0
            }
          ]
        },
        {
          name: 'Tasks completed',
          series: [
            {
              name: '12AM',
              value: 0
            },
            {
              name: '1AM',
              value: 0
            },
            {
              name: '2AM',
              value: 0
            },
            {
              name: '3AM',
              value: 0
            },
            {
              name: '4AM',
              value: 0
            },
            {
              name: '5AM',
              value: 0
            },
            {
              name: '6AM',
              value: 0
            },
            {
              name: '7AM',
              value: 0
            },
            {
              name: '8AM',
              value: 0
            },
            {
              name: '9AM',
              value: 0
            },
            {
              name: '10AM',
              value: 0
            },
            {
              name: '11AM',
              value: 0
            },
            {
              name: '12PM',
              value: 0
            },
            {
              name: '1PM',
              value: 0
            },
            {
              name: '2PM',
              value: 0
            },
            {
              name: '3PM',
              value: 0
            },
            {
              name: '4PM',
              value: 0
            },
            {
              name: '5PM',
              value: 0
            },
            {
              name: '6PM',
              value: 0
            },
            {
              name: '7PM',
              value: 0
            },
            {
              name: '8PM',
              value: 0
            },
            {
              name: '9PM',
              value: 0
            },
            {
              name: '10PM',
              value: 0
            },
            {
              name: '11PM',
              value: 0
            }
          ]
        }
      ];

      this.perWeekStats = [
        {
          name: 'Tasks created',
          series: [
            {
              name: 'Sunday',
              value: 0
            },
            {
              name: 'Monday',
              value: 0
            },
            {
              name: 'Tuesday',
              value: 0
            },
            {
              name: 'Wednesday',
              value: 0
            },
            {
              name: 'Thursday',
              value: 0
            },
            {
              name: 'Friday',
              value: 0
            },
            {
              name: 'Saturday',
              value: 0
            },
          ]
        },
        {
          name: 'Tasks completed',
          series: [
            {
              name: 'Sunday',
              value: 0
            },
            {
              name: 'Monday',
              value: 0
            },
            {
              name: 'Tuesday',
              value: 0
            },
            {
              name: 'Wednesday',
              value: 0
            },
            {
              name: 'Thursday',
              value: 0
            },
            {
              name: 'Friday',
              value: 0
            },
            {
              name: 'Saturday',
              value: 0
            },
          ]
        }
      ];

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

  taskCompletedComment() {
    if (this.isLoaded && !this.isNewAccount()) {
      const percent = Math.round(100 * (this.userStats.tasksCompleted / this.userStats.tasksCreated));
      return percent > 50 ? `You've finished ${percent}% of your tasks here. Nice going!`
      : `You've finished ${percent}% of your tasks here. You've probably just delegated yourself a new load of tasks - best of luck!`;
    }
  }

  categorizeHabits() {
    if (this.hasStats) {
      const createdPerSection = [0, 0, 0];

      // categorize by day
      for (let i = 0; i < 24; i++) {
        if (i < 3 || i > 20) {
          // night
          createdPerSection[2] += this.perDayStats[0].series[i];
        } else if (i > 3 && i < 13) {
          // morning
          createdPerSection[0] += this.perDayStats[0].series[i];
        } else {
          // afternoon
          createdPerSection[1] += this.perDayStats[0].series[i];
        }
      }

      if (createdPerSection[0] > createdPerSection[1] && createdPerSection[0] > createdPerSection[2]) {
        this.creationType = 'Morning person!';
      } else if (createdPerSection[1] > createdPerSection[0] && createdPerSection[1] > createdPerSection[2]) {
        this.creationType = 'Afternoon person!';
      } else {
        this.creationType = 'Evening person!';
      }
    }
  }

}
