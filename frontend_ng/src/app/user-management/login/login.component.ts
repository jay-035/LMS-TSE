import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/courses']);
          } else {
            console.error('Login failed: Token not returned');
          }
        },
        error: (err) => console.error('Login failed', err),
      });
    } else {
      console.error('Email and password are required');
    }
  }
}
