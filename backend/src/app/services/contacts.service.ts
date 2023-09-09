import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(
    private afs: AngularFirestore,
    private toast: ToastrService,
  ) {}

  loadData() {
    return this.afs
      .collection('contacts')
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

  deleteData(id: string) {
    this.afs
      .doc(`contacts/${id}`)
      .delete()
      .then(() => {
        this.toast.warning('Delete post successfully!');
      });
  }
}
