import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private afs: AngularFirestore) {}

  addComment(commentData: any) {
    this.afs
      .collection('comments')
      .add(commentData)
      .then(() => {
        console.log('Adding comment successfully!');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
