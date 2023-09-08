import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

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

  loadLatest() {
    return this.afs
      .collection('comments', (ref) => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data();
            return { id, data };
          });
        }),
      );
  }
}
