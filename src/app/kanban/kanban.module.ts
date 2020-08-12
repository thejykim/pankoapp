import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskDialogComponent } from './dialogs/task-dialog.component';
import { BoardListComponent } from './board-list/board-list.component';
import { DeleteButtonComponent } from './buttons/delete-button/delete-button.component';
import { FocusInputDirective } from './directives/focus-input.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    BoardListComponent,
    BoardComponent,
    TaskDialogComponent,
    DeleteButtonComponent,
    FocusInputDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    KanbanRoutingModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatCheckboxModule
  ],
  entryComponents: [TaskDialogComponent]
})
export class KanbanModule {}
