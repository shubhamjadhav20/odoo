import { Component } from '@angular/core';
import { AuthService } from './auth/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone:true,
  imports: [CommonModule,
    RouterOutlet, // This provides the <router-outlet> directive
    RouterModule]
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}