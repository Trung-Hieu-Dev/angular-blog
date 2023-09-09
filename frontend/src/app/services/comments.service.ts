import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(
    private afs: AngularFirestore,
    private firestore: AngularFirestore,
  ) {}

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

  loadComments(postId: string, parentId = null) {
    return this.afs
      .collection('comments', (ref) =>
        ref
          .orderBy('createdAt', 'desc')
          .where('postId', '==', postId)
          .where('parentId', '==', parentId),
      )
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

  countDocuments(postId): Promise<number> {
    return this.firestore
      .collection('comments', (ref) => ref.where('postId', '==', postId))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        return querySnapshot.size;
      });
  }
}
