import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../auth/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from '../../shared/toaster/toaster.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  passwordMismatch = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  checkPasswords(): void {
    this.passwordMismatch = this.user.password !== this.user.confirmPassword;
  }

  onSubmit(): void {
    if (this.passwordMismatch) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // setTimeout(() => {
    // if (this.authService.signup(this.user.email, this.user.password)) {
    //   this.successMessage = 'Account created successfully! Redirecting...';
    //   this.router.navigate(['/home']);
    // } else {
    //   this.errorMessage = 'Email already exists';
    // }
    // this.isLoading = false;
    this.sharedService.signup(this.user.email, this.user.password).subscribe(
      (data) => {
        console.log('$login succesful ', data);
        this.router.navigate(['/home']);
        this.isLoading = false;
        this.snackBar.openFromComponent(ToasterComponent, {
          duration: 5000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          data: {
            isSuccess: true,
            title: 'Registered successfully!',
          },
        });
      },
      (err) => {
        this.isLoading = false;
        this.snackBar.openFromComponent(ToasterComponent, {
          duration: 5000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          data: {
            isError: true,
            title: err.error.error,
          },
        });
      }
    );
    // }, 1000);
  }
}
