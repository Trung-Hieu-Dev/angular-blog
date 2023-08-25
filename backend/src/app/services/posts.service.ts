import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../models/post';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toast: ToastrService,
    private router: Router,
  ) {}

  uploadImage(
    selectedImage: any,
    postData: Post,
    formStatus: string,
    id: string,
  ) {
    // save image to Storage
    const filePath = `postIMG/${Date.now()}`;

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Image uploaded successfully!');

      // get the image URL
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;

          // insert or update post data into Firestore Database
          if (formStatus === 'Add') {
            this.saveData(postData);
          } else {
            this.updateData(id, postData);
          }
        });
    });
  }

  saveData(postData: Post) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toast.success('Data insert successfully!');
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadData() {
    return this.afs
      .collection('posts')
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

  loadPostById(id: string) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: string, post: Post) {
    this.afs
      .doc(`posts/${id}`)
      .update(post)
      .then(() => {
        this.toast.success('Updated successfully!');
        this.router.navigate(['/posts']);
      });
  }
}
