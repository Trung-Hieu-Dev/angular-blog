import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

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
        this.toastr.success('Category is saved !');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadData() {
    return this.afs
      .collection('categories')
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

  updateData(id: string, editData: Category) {
    this.afs
      .collection('categories')
      .doc(id)
      .update(editData)
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Category is updated !');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteData(id: string) {
    this.afs
      .collection('categories')
      .doc(id)
      .delete()
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Delete successfully !');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
