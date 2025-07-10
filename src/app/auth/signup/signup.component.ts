import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  passwordMismatch = false;

  constructor(private authService: AuthService, private router: Router) {}

  checkPasswords(): void {
    this.passwordMismatch = this.user.password !== this.user.confirmPassword;
  }

  onSubmit(): void {
    if (this.passwordMismatch) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    setTimeout(() => {
      if (this.authService.signup(this.user)) {
        this.successMessage = 'Account created successfully! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.errorMessage = 'Email already exists';
      }
      this.isLoading = false;
    }, 1000);
  }
}