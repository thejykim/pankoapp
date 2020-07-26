import { Component, OnInit, Input } from '@angular/core';
import { UserStats } from '../../user-stats.model';
import * as moment from 'moment';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.scss']
})
export class BasicCardComponent implements OnInit {
  @Input() userStats: UserStats;

  // arrays for direct graph use
  taskStats: any[];
  boardStats: any[];
  weekComparisonGraph: any[];

  // pure data arrays
  weekComparison: any[];

  canCompareWeeks: boolean;

  constructor() { }

  ngOnInit(): void {
    this.fillStats();
  }

  fillStats() {
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

    // Fill array for weekly comparison graphs
    this.weekComparison = [];
    this.weekComparisonGraph = [];
    let tempArray = [];
    const firstDate = new Date(this.userStats.completedTimes[0]);
    tempArray[0] = firstDate;
    this.weekComparison.push(tempArray);

    for (let i = 1; i < this.userStats.completedTimes.length; i++) {
      const date = new Date(this.userStats.completedTimes[i]);
      const latestWeek = this.weekComparison[this.weekComparison.length - 1];
      const prev = latestWeek[latestWeek.length - 1];
      if (this.isSameWeek(date, prev)) {
        // Add to the current week's index
        latestWeek.push(date);
      } else {
        // Create a new week's index in array
        tempArray = [];
        tempArray[0] = date;
        this.weekComparison.push(tempArray);
      }
    }

    // check if week comparison can be drawn
    if (this.weekComparison.length < 2) {
      this.canCompareWeeks = false;
    } else {
      const currentDate = new Date();
      const latestWeek = this.weekComparison[this.weekComparison.length - 1];

      const weekBeforeToday = new Date(Date.now() - 604800000);
      const prevWeek = this.weekComparison[this.weekComparison.length - 2];

      if (this.isSameWeek(currentDate, latestWeek[latestWeek.length - 1]) &&
      this.isSameWeek(weekBeforeToday, prevWeek[prevWeek.length - 1])) {
        // user has data from both weeks
        this.generateDataArray(this.weekComparisonGraph, 'Current week', 'days');
        this.generateDataArray(this.weekComparisonGraph, 'Previous week', 'days');

        latestWeek.forEach(time => {
          this.weekComparisonGraph[0].series[time.getDay()].value++;
        });

        prevWeek.forEach(time => {
          this.weekComparisonGraph[1].series[time.getDay()].value++;
        });

        this.canCompareWeeks = true;
      } else {
        this.canCompareWeeks = false;
      }
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

  // returns true if both dates are within the same calendar week, first must be earlier date
  isSameWeek(first: Date, second: Date) {
    return (moment(first).week() === moment(second).week());
  }

  taskCompletedComment() {
    const percent = Math.round(100 * (this.userStats.tasksCompleted / this.userStats.tasksCreated));
    return percent > 50 ? `You've finished ${percent}% of your tasks here. Nice going!`
    : `You've finished ${percent}% of your tasks here.`;
  }

}
