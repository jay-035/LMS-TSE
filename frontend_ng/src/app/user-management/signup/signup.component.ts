import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  http = inject(HttpClient); // Injecting HttpClient to handle requests

  constructor(private fb: FormBuilder) {
    // Initialize form with validation
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const { name, email, password, role } = this.signupForm.value;

    // Make HTTP request to register the user
    this.http.post('http://localhost:5000/api/signup', { name, email, password, role })
      .subscribe({
        next: (response: any) => {
          // Handle successful registration
          alert('Registration successful!');
        },
        error: (error: any) => {
          // Handle errors
          this.errorMessage = error?.error?.msg || 'Registration failed';
        }
      });
  }
}
