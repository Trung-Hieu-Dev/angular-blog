import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sub } from '../models/sub';

@Injectable({
  providedIn: 'root',
})
export class SubcribersService {
  constructor(private afs: AngularFirestore) {}

  addSubs(subData: Sub) {
    this.afs
      .collection('subscribers')
      .add(subData)
      .then(() => {
        console.log('Adding sub successfully!');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
