import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Board, Task } from './board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  // create a new board
  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;
    const increment = firebase.firestore.FieldValue.increment(1);

    return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Click to edit me!', label: 'yellow', isDone: false }]
    }).then(doc =>
      this.db.collection('userStats').doc(user.uid).set({boardsCreated: increment, tasksCreated: increment}, {merge: true}));
  }

  // delete a board
  async deleteBoard(boardID: string) {
    return this.db.collection('boards').doc(boardID).delete();
  }

  // create card
  async createTask(boardID: string, tasks: Task[], isCompleted: boolean) {
    const user = await this.afAuth.currentUser;
    const increment = firebase.firestore.FieldValue.increment(1);

    const db = firebase.firestore();
    const batch = db.batch();

    // update board doc
    const boardRef = db.collection('boards').doc(boardID);
    batch.update(boardRef, { tasks });

    // update user stats
    const userRef = db.collection('userStats').doc(user.uid);
    if (!isCompleted) {
      batch.set(userRef, {tasksCreated: increment}, {merge: true});
    } else {
      batch.set(userRef, {tasksCreated: increment, tasksCompleted: increment}, {merge: true});
    }

    // commit batch
    batch.commit();
  }

  // edit cards on board
  async editTasks(boardID: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardID).update({ tasks });
  }

  // toggle card completion
  async toggleTask(boardID: string, tasks: Task[], isCompleted: boolean) {
    const user = await this.afAuth.currentUser;
    const increment = firebase.firestore.FieldValue.increment(isCompleted ? 1 : -1);

    const db = firebase.firestore();
    const batch = db.batch();

    // update board doc
    const boardRef = db.collection('boards').doc(boardID);
    batch.update(boardRef, { tasks });

    // update user stats
    const userRef = db.collection('userStats').doc(user.uid);
    batch.set(userRef, {tasksCompleted: increment}, {merge: true});

    // commit batch
    batch.commit();
  }

  // remove card on board
  async removeTask(boardID: string, task: Task) {
    const user = await this.afAuth.currentUser;
    const increment = firebase.firestore.FieldValue.increment(1);

    return this.db.collection('boards').doc(boardID).update({
      tasks: firebase.firestore.FieldValue.arrayRemove(task)
    });
  }

  // edit board title
  async editBoardTitle(boardID: string, newTitle: string) {
    const user = await this.afAuth.currentUser;

    return this.db.collection('boards').doc(boardID).update({
      title: newTitle
    });
  }

  // get user's boards
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.collection<Board>('boards', ref =>
            ref.where('uid', '==', user.uid).orderBy('priority')
          )
          .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  // change the priority of boards after sorting
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
