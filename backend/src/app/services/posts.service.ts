import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private storage: AngularFireStorage) {}

  saveImage(selectedImage: any) {
    const filePath = `postIMG/${Date.now()}`;

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Image uploaded successfully!');
    });
  }
}
