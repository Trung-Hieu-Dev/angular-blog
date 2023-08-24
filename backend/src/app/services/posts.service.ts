import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../models/post';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toast: ToastrService,
  ) {}

  uploadImage(selectedImage: any, postData: Post) {
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

          // insert post data into Firestore Database
          this.saveData(postData);
        });
    });
  }

  saveData(postData: Post) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toast.success('Data insert successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
