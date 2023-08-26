import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: any;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userEmail = JSON.parse(localStorage.getItem('user'))?.email;

    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }
}
