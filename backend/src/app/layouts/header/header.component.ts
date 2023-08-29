import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: string = '';
  isLoggedIn$: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuth().subscribe((response) => {
      if (response) {
        // INFO: use for login actions
        this.isLoggedIn$ = true;
        this.userEmail = response.email;
      } else {
        // INFO: in case, the page is reloaded
        const userData = this.authService.getUserData();

        if (userData) {
          this.isLoggedIn$ = true;
          this.userEmail = userData.email;
        } else {
          this.isLoggedIn$ = false;
          this.userEmail = '';
        }
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
