import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { UserStats } from './user-stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  // get user stats
  getUserStats() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.collection('userStats').doc(user.uid).valueChanges();
        } else {
          return [];
        }
      })
    );
  }
}
