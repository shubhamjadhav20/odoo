import { Component, ViewEncapsulation } from '@angular/core';
import { SharedService } from './auth/auth/shared.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class AppComponent {
  checkIsLogin(): boolean {
    return (
      this.router.url.endsWith('/login') || this.router.url.endsWith('/signup')
    );
  }
  constructor(public sharedService: SharedService, private router: Router) {}
  notifications: any = [
    {
      title: 'Someone commented on your answer',
      read: true,
    },
    {
      title: 'Someone answered on your question',
      read: false,
    },
    {
      title: 'Someone mentioned you',
      read: true,
    },
    {
      title: 'Someone mentioned you',
      read: true,
    },
    {
      title: 'Someone commented on your answer',
      read: true,
    },
    {
      title: 'Someone answered on your question',
      read: false,
    },
    {
      title: 'Someone mentioned you',
      read: true,
    },
    {
      title: 'Someone mentioned you',
      read: true,
    },
  ];

  markAllAsRead() {
    this.notifications = this.notifications.map((n: any) => ({
      ...n,
      read: true,
    }));
  }

  logout(): void {
    this.sharedService.logout();
  }
  askQuestion() {
    this.router.navigate(['/ask']);
  }
}
