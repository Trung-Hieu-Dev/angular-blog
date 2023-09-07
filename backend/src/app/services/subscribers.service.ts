import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(
    private afs: AngularFirestore,
    private toast: ToastrService,
  ) {}

  loadData() {
    return this.afs
      .collection('subscribers')
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
      .doc(`subscribers/${id}`)
      .delete()
      .then(() => {
        this.toast.warning('Delete post successfully!');
      });
  }
}
