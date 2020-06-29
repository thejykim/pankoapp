import { Component, Input } from '@angular/core';
import { BoardService } from '../board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Task } from '../board.model';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() board;
  display: Task[];
  editingTitle: boolean;
  boardField: HTMLInputElement;
  oldBoardTitle: string;
  @Input() boardTitle: string;

  constructor(private boardService: BoardService, public dialog: MatDialog) { }

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.editTasks(this.board.id, this.board.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple', isDone: false };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.boardService.createTask(this.board.id, [
            ...this.board.tasks,
            result.task
          ], result.task.isDone);
        } else {
          const update = this.board.tasks;
          update.splice(result.idx, 1, result.task);
          this.boardService.editTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }

  handleDelete() {
    this.boardService.deleteBoard(this.board.id);
  }

  parseNewLine(parse) {
    return parse.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  toggleTitle() {
    this.oldBoardTitle = this.boardTitle;
    this.editingTitle = true;
  }

  editTitle() {
    if (this.oldBoardTitle !== this.boardTitle) {
      this.boardService.editBoardTitle(this.board.id, this.boardTitle);
    }

    this.editingTitle = false;
  }

  checkTask(event, task: Task, idx: number) {
    event.stopPropagation();
    if (task.hasOwnProperty('isDone')) {
      task.isDone = !task.isDone;
    } else {
      task.isDone = true;
    }

    const update = this.board.tasks;
    update.splice(idx, 1, task);
    this.boardService.toggleTask(this.board.id, this.board.tasks, task.isDone);

    return false;
  }

}
