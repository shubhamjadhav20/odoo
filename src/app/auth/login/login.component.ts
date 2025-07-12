import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../auth/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from '../../shared/toaster/toaster.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.sharedService.login(this.email, this.password).subscribe(
      (data) => {
        console.log('$login succesful ', data);
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('email', data.email);
        this.sharedService.setToken(data.token);
        this.router.navigate(['/home']);
        this.isLoading = false;
        this.snackBar.openFromComponent(ToasterComponent, {
          duration: 5000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          data: {
            isSuccess: true,
            title: 'Logged in successfully!',
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

    // setTimeout(() => {
    //   if (this.authService.login(this.email, this.password)) {
    //     this.router.navigate(['/home']);
    //   } else {
    //     this.errorMessage = 'Invalid email or password';
    //   }
    // }, 1000);
  }
}
