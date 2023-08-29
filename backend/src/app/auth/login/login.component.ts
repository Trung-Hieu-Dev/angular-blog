import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onSubmit(formValue: any) {
    const email = formValue.email;
    const password = formValue.password;

    this.authService.login(email, password);
  }
}
