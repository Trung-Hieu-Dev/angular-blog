import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private afs: AngularFirestore) {}

  saveData(data: Contact) {
    this.afs
      .collection('contacts')
      .add(data)
      .then(() => {
        console.log('Save message');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
