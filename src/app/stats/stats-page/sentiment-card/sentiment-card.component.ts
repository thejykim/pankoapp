import { Component, OnInit, Input } from '@angular/core';
import { UserStats } from '../../user-stats.model';

@Component({
  selector: 'app-sentiment-card',
  templateUrl: './sentiment-card.component.html',
  styleUrls: ['./sentiment-card.component.scss']
})
export class SentimentCardComponent implements OnInit {
  @Input() userStats: UserStats;

  // graph data
  advancedPie: any[];

  // raw data
  polarities: number[];
  avgPolarity: number;

  constructor() { }

  ngOnInit(): void {
    this.advancedPie = [];
    this.avgPolarity = 0;
    this.fillStats();
    this.analyzePolarity();
  }

  fillStats() {
    this.generateDataArray(this.advancedPie, 'Morning');
    this.generateDataArray(this.advancedPie, 'Afternoon');
    this.generateDataArray(this.advancedPie, 'Evening');

    this.polarities = this.userStats.creationData.map((task) => {
      const currHour = new Date(task.date).getHours();
      let i: number;
      if (currHour < 5 || currHour > 20) {
        i = 2;
      } else if (currHour >= 5 && currHour <= 12) {
        i = 0;
      } else {
        i = 1;
      }

      if (task.mood < 0) {
        this.advancedPie[i].series[0].value++;
      } else if (task.mood == 0) {
        this.advancedPie[i].series[1].value++;
      } else {
        this.advancedPie[i].series[2].value++;
      }

      return task.mood ? task.mood : 0;
    });
  }

  analyzePolarity() {
    if (this.polarities) {
      this.avgPolarity = 0;

      this.polarities.forEach((polarity) => {
        this.avgPolarity += polarity / this.polarities.length;
      });
    }
  }

  generateDataArray(result: any[], title: string) {
    const data = {
      name: title,
      series: []
    };

    // sentiment categories
    const sections = new Array(3);
    sections[0] = 'Negative';
    sections[1] = 'Neutral';
    sections[2] = 'Positive';

    for (let i = 0; i < 3; i++) {
      data.series.push({
        name: sections[i],
        value: 0
      });
    }

    result.push(data);
  }

}
