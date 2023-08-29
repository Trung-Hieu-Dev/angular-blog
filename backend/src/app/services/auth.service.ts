import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUserData } from '../models/user';

const USER_DATA_LOCALSTORAGE_NAME = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<IUserData | null> =
    new BehaviorSubject<IUserData | null>(null);

  isLoggedInGuard: boolean = false;

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

        this.loggedIn.next(logRef?.user?.toJSON() as unknown as IUserData);

        this.setLoggedInGuard(true);

        this.router.navigate(['/']);
      })
      .catch((e) => {
        this.toastr.warning(e);
      });
  }

  loadUserData() {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem(USER_DATA_LOCALSTORAGE_NAME, JSON.stringify(user));
      // this.setLoggedInGuard(true); // why if set setLoggedInGuard here, result will be return null when get value??
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.toastr.success('User logout successfully!');
      localStorage.removeItem(USER_DATA_LOCALSTORAGE_NAME);
      this.setLoggedInGuard(false);

      this.loggedIn.next(null);

      this.router.navigate(['/login']);
    });
  }

  getUserData() {
    const userDatePlainText = localStorage.getItem(USER_DATA_LOCALSTORAGE_NAME);

    const userData: IUserData | null = userDatePlainText
      ? JSON.parse(userDatePlainText)
      : null;

    return userData;
  }

  getAuth() {
    return this.loggedIn.asObservable();
  }

  setLoggedInGuard(value: boolean): void {
    this.isLoggedInGuard = value;
    localStorage.setItem('isLoggedInGuard', JSON.stringify(value));
  }

  getLoggedInGuard(): boolean {
    const isLoggedInGuard = localStorage.getItem('isLoggedInGuard');
    return isLoggedInGuard ? JSON.parse(isLoggedInGuard) : false;
  }
}
