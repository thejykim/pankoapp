import { Component, OnInit, Input } from '@angular/core';
import { UserStats } from '../../user-stats.model';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.scss']
})
export class BasicCardComponent implements OnInit {
  @Input() userStats: UserStats;
  taskStats: any[];
  boardStats: any[];

  constructor() { }

  ngOnInit(): void {
    this.fillStats();
  }

  fillStats() {
    if (true) {
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
    }
  }

  taskCompletedComment() {
    if (true) {
      const percent = Math.round(100 * (this.userStats.tasksCompleted / this.userStats.tasksCreated));
      return percent > 50 ? `You've finished ${percent}% of your tasks here. Nice going!`
      : `You've finished ${percent}% of your tasks here.`;
    }
  }

}
