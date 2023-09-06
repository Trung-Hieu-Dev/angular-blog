import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {map} from 'rxjs';

// import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afs: AngularFirestore) {}

  loadFeatured() {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4),
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

  loadLatest() {
    return this.afs
      .collection('posts', (ref) => ref.orderBy('createdAt'))
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

  loadCategoryPost(categoryId) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId).limit(4),
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

  loadPostById(postId) {
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }

  countViews(postId: any, viewCount: number) {
    const viewsCount = viewCount + 1;
    this.afs
      .doc(`posts/${postId}`)
      .update({ views: viewsCount })
      .then(() => {
        console.log('updated');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
