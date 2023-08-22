import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService,
  ) {}

  saveData(categoryData: Category) {
    this.afs
      .collection('categories')
      .add(categoryData)
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Category is saved!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
