import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Board, Task } from './board.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private http: HttpClient) { }

  // create a new board
  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;
    const increment = firebase.firestore.FieldValue.increment(1);

    return this.db.collection('boards').add({
      ...data,
      uid: user.uid
    }).then(doc =>
      this.db.collection('userStats').doc(user.uid).set(
        {boardsCreated: increment}, {merge: true}
      )
    );
  }

  // delete a board
  async deleteBoard(boardID: string) {
    return this.db.collection('boards').doc(boardID).delete();
  }

  // create card
  async createTask(boardID: string, tasks: Task[], task: Task, isCompleted: boolean) {
    let results: any;
    let polarity: number;

    results = await this.getPolarity(task.description);
    polarity = results.hasOwnProperty('result') ? results.result.polarity : 0;

    const creationArray = { 'date': Date.now(), 'mood': polarity };

    const user = await this.afAuth.currentUser;
    const increment = firebase.firestore.FieldValue.increment(1);
    const creationUnion = firebase.firestore.FieldValue.arrayUnion(creationArray);

    const db = firebase.firestore();
    const batch = db.batch();

    let previousCompletion;

    if (!isCompleted && task.hasOwnProperty('completed')) {
      previousCompletion = task.completed;
    }

    // update task
    task.completed = isCompleted ? Date.now() : 0;

    const updateDate = isCompleted ? firebase.firestore.FieldValue.arrayUnion(task.completed)
    : firebase.firestore.FieldValue.arrayRemove(previousCompletion);

    // update board doc
    const boardRef = db.collection('boards').doc(boardID);
    batch.update(boardRef, { tasks });

    // update user stats
    const userRef = db.collection('userStats').doc(user.uid);
    if (!isCompleted) {
      batch.set(userRef, {tasksCreated: increment,  creationData: creationUnion}, {merge: true});
    } else {
      batch.set(userRef,
        {tasksCreated: increment, tasksCompleted: increment,  creationData: creationUnion, completedTimes: updateDate}, {merge: true}
      );
    }

    // commit batch
    batch.commit();
  }

  // edit cards on board
  async editTasks(boardID: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardID).update({ tasks });
  }

  // toggle card completion
  async toggleTask(boardID: string, tasks: Task[], task: Task, isCompleted: boolean) {
    const user = await this.afAuth.currentUser;
    const increment = firebase.firestore.FieldValue.increment(isCompleted ? 1 : -1);

    let previousCompletion;

    if (!isCompleted && task.hasOwnProperty('completed')) {
      previousCompletion = task.completed;
    }

    // update task
    task.completed = isCompleted ? Date.now() : 0;

    const updateDate = isCompleted ? firebase.firestore.FieldValue.arrayUnion(task.completed)
    : firebase.firestore.FieldValue.arrayRemove(previousCompletion);

    const db = firebase.firestore();
    const batch = db.batch();

    // update board doc
    const boardRef = db.collection('boards').doc(boardID);
    batch.update(boardRef, { tasks });

    // update user stats
    const userRef = db.collection('userStats').doc(user.uid);
    batch.set(userRef, {tasksCompleted: increment, completedTimes: updateDate}, {merge: true});

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

  async getPolarity(text: String) {
    let results: Promise<Object>;

    const body = {
      'text': text
    };

    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type':  'application/json'
      })
    };

    results = this.http.post('https://sentim-api.herokuapp.com/api/v1/', body, options).pipe(
      catchError(function(errorResponse: HttpErrorResponse) {
        return throwError('Failed to calculate sentiment. Defaulting to neutral polarity!');
      })
    ).toPromise();

    return Promise.resolve(results);
  }
}
