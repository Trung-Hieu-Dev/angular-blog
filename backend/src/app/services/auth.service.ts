import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.toastr.success('Login successfully!');
        this.loadUserData();
        this.router.navigate(['/']);
      })
      .catch((e) => {
        this.toastr.warning(e);
      });
  }

  loadUserData() {
    this.afAuth.authState.subscribe((user) => {
      // console.log(JSON.parse(JSON.stringify(user)));
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}
