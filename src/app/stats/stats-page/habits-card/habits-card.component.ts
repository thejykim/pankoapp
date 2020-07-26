import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserStats } from '../../user-stats.model';

@Component({
  selector: 'app-habits-card',
  templateUrl: './habits-card.component.html',
  styleUrls: ['./habits-card.component.scss']
})
export class HabitsCardComponent implements OnInit {
  @Input() userStats: UserStats;

  // arrays for direct graph use
  perDayStats: any[];
  perWeekStats: any[];

  creationType: string;
  completionType: string;
  displayGraphType: string;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.fillStats();
    this.categorizeHabits();
    this.displayGraphType = 'hour';
  }

  fillStats() {
    // Fill arrays for per hour/day graphs
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
      weekday[0] = 'Sun';
      weekday[1] = 'Mon';
      weekday[2] = 'Tue';
      weekday[3] = 'Wed';
      weekday[4] = 'Thu';
      weekday[5] = 'Fri';
      weekday[6] = 'Sat';

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
